import onChange from 'on-change';
import _ from 'lodash';
import * as yup from 'yup';
import { switchLang } from './lang';
import { watchedData } from './data';
import { rssParser } from './rssParser';
import { watchedFeedback } from './feedback';

const input = document.getElementById('url-input');
const form = document.getElementById('rss-form');

const state = {
  stateDefaultValues: {
    url: '',
    lang: 'ru',
  }
};

export const initState = () => {
  Object.assign(state, state.stateDefaultValues);
};

const schema = yup.object({ url: yup.string().url().required() });

export const watchedState = onChange(state, (path, value) => {
  if (path === 'lang') switchLang(value);
  schema.isValid(state).then((isValid) => {
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      // button.classList.remove('disabled');
      // button.classList.add('active');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      // button.classList.remove('active');
      // button.classList.add('disabled');
    }
  });
});

export const eventListener = () => {
  input.addEventListener('input', (e) => {
    watchedState.url = e.target.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    schema.isValid({ url }).then((isValid) => {
      if (isValid) {
        if (_.find(watchedData.feeds, (feed) => {
          return feed.link === url;
        })) {
          watchedFeedback.text = 'RSS уже существует';
          watchedFeedback.color = 'red';
        } else {
          rssParser(url)
            .then(({ feed, posts }) => {
              watchedData.feeds.push(feed);
              watchedData.posts.push(...posts);
            })
            .then(() => {
              watchedFeedback.text = 'RSS успешно загружен';
              watchedFeedback.color = 'green';
            });
        }
      } else {
        watchedFeedback.text = 'Ссылка должна быть валидным URL';
        watchedFeedback.color = 'red';
      }
    });
  });
};

export const updater = () => {
  setTimeout(() => {
    watchedData.feeds.forEach((feed) => {
      rssParser(feed.link, feed.id)
        .then(({ posts }) => {
          const uniquePosts = posts.filter((newPost) => !_.find(watchedData.posts, (dataPost) => dataPost.title === newPost.title));
          watchedData.posts.push(...uniquePosts);
        })
        .then(() => updater());
    });
  }, 5000);
};
