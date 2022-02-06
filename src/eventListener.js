import * as yup from 'yup';
import _ from 'lodash';
import watchedData from './data';
import watchedFeedback from './feedback';
import { localeInstance } from './lang/localeInstanse';
import rssParser from './rssParser';
import watchedState from './state/watchedState';

const eventList = () => {
  const input = document.getElementById('url-input');
  const form = document.getElementById('rss-form');
  const schema = yup.object({ url: yup.string().url().required() });
  input.addEventListener('input', (e) => {
    watchedState.url = e.target.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    schema.isValid({ url }).then((isValid) => {
      if (isValid) {
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
            })
            .catch(() => {
              watchedFeedback.text = localeInstance.t('rssValidUrlNo');
              watchedFeedback.color = 'red';
            });
        }
      } else {
        watchedFeedback.text = localeInstance.t('rssValidNo');
        watchedFeedback.color = 'red';
      }
    });
  });
};

const eventListener = () => {
  window.addEventListener('load', () => eventList());
};

export default eventListener;
