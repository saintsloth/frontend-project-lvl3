import onChange from 'on-change';
import * as yup from 'yup';
import changeLang from '../lang/switchLang';
import getState from './state';

const getWatchedState = (state = getState()) => onChange(state, (path, value) => {
  if (path === 'lang') changeLang(value);

  const schema = yup.object({ url: yup.string().url().required() });
  schema.isValid(state).then((isValid) => {
    const input = document.getElementById('url-input');
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  });
});

export default getWatchedState;
