import onChange from 'on-change';
import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index';

const h1 = document.querySelector('h1');
const lead = document.querySelector('.lead');
const input = document.getElementById('url-input');
const inputLabel = document.querySelector('label[for=url-input]');
const button = document.getElementById('rss-button');

const state = {};
const stateDefaultValues = {
  url: '',
  lang: 'ru',
};
export const initState = () => {
  Object.assign(state, stateDefaultValues);
};

const localeInstance = i18n.createInstance();

const switchLang = (lang = state.lang) => {
  localeInstance.changeLanguage(lang).then(() => {
    h1.textContent = localeInstance.t('h1');
    lead.textContent = localeInstance.t('lead');
    inputLabel.textContent = localeInstance.t('input');
    button.textContent = localeInstance.t('button');
  });
};

export const initLocales = () => {
  localeInstance.init({
    resources: {
      ru: resources.ru,
      en: resources.en,
    },
  }).then(() => {
    switchLang(stateDefaultValues.lang);
  });
};

const schema = yup.object({ url: yup.string().url().required() });

export const watchedState = onChange(state, (path, value) => {
  if (path === 'lang') switchLang(value);
  schema.isValid(state).then((isValid) => {
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      button.classList.remove('disabled');
      button.classList.add('active');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      button.classList.remove('active');
      button.classList.add('disabled');
    }
  });
});
