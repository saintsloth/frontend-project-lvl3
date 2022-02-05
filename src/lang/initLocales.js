import resources from '../locales';
import changeLang from './switchLang';
import locale from './localeInstanse';

export const initLocales = () => {
  locale.init({
    resources: {
      ru: resources.ru,
      en: resources.en,
    },
  }).then(() => {
    changeLang();
  });
};

export default initLocales;
