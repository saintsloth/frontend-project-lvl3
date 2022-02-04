import { watchedState } from './model';

const input = document.getElementById('url-input');
const form = document.getElementById('rss-form');

export const eventListener = () => {
  input.addEventListener('input', (e) => {
    watchedState.url = e.target.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
};
