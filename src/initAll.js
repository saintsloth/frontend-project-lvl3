import eventListener from './eventListener';
import updater from './updater';
import { initLocales } from './lang/initLocales';

const initAll = () => {
  eventListener();
  initLocales();
  updater();

};

export default initAll;
