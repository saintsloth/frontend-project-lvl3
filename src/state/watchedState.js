import onChange from 'on-change';
import * as yup from 'yup';
import changeLang from '../lang/switchLang';
import { state } from './state';

const input = document.getElementById('url-input');
const schema = yup.object({ url: yup.string().url().required() });

const watchedState = onChange(state, (path, value) => {
  if (path === 'lang') changeLang(value);
  schema.isValid(state).then((isValid) => {
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  });
});

export default watchedState;
