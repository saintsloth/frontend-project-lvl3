import * as yup from 'yup';
import _ from 'lodash';
import getWatchedData from './data';
import getWatchedFeedback from './feedback';
import { localeInstance } from './lang/localeInstanse';
import rssParser from './rssParser';
import getWatchedState from './state/watchedState';
import { buttonBlock, buttonUnBlock } from './button';

const eventListener = () => {
  const input = document.getElementById('url-input');
  const form = document.getElementById('rss-form');
  const schema = yup.object({ url: yup.string().url().required() });
  const watchedState = getWatchedState();
  const watchedData = getWatchedData();
  const watchedFeedback = getWatchedFeedback();

  input.addEventListener('input', (e) => {
    watchedState.url = e.target.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    schema.isValid({ url }).then((isValid) => {
      if (isValid) {
        buttonBlock();
        if (_.find(watchedData.feeds, (feed) => feed.link === url)) {
          watchedFeedback.text = localeInstance.t('rssExist');
          watchedFeedback.color = 'red';
        } else {
          rssParser(url)
            .then(({ feed, posts }) => {
              watchedData.feeds.push(feed);
              watchedData.posts.push(...posts);
            })
            .then(() => {
              watchedFeedback.text = localeInstance.t('rssSuccess');
              watchedFeedback.color = 'green';
              form.reset();
              input.focus();
            })
            .catch((error) => {
              if (error.message === 'Network Error') {
                watchedFeedback.text = localeInstance.t('rssNetworkError');
                watchedFeedback.color = 'red';
              } else {
                watchedFeedback.text = `${localeInstance.t('rssValidUrlNo')} url: ${url}`;
                watchedFeedback.color = 'red';
              }
            })
            .then(() => {
              buttonUnBlock();
            });
        }
      } else {
        watchedFeedback.text = localeInstance.t('rssValidNo');
        watchedFeedback.color = 'red';
      }
    });
  });
  return watchedData;
};

export default eventListener;
