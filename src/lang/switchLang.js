import locale from './localeInstanse';

export const switchLang = (lang = 'ru') => {
  const h1 = document.querySelector('h1');
  const lead = document.querySelector('.lead');
  const inputLabel = document.querySelector('label[for=url-input]');
  const button = document.getElementById('rss-button');
  locale.changeLanguage(lang).then(() => {
    h1.textContent = locale.t('h1');
    lead.textContent = locale.t('lead');
    inputLabel.textContent = locale.t('input');
    button.textContent = locale.t('button');
  });
};

export default switchLang;
