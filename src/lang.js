import resources from './locales';
import i18n from 'i18next';
import { watchedState } from './state';

const localeInstance = i18n.createInstance();

export const initLocales = () => {
  localeInstance.init({
    resources: {
      ru: resources.ru,
      en: resources.en,
    },
  }).then(() => {
    switchLang();
  });
};

export const switchLang = (lang = watchedState.lang) => {
  const h1 = document.querySelector('h1');
  const lead = document.querySelector('.lead');
  const inputLabel = document.querySelector('label[for=url-input]');
  const button = document.getElementById('rss-button');
  localeInstance.changeLanguage(lang).then(() => {
    h1.textContent = localeInstance.t('h1');
    lead.textContent = localeInstance.t('lead');
    inputLabel.textContent = localeInstance.t('input');
    button.textContent = localeInstance.t('button');
  });
};