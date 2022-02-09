import eventListener from './eventListener';
import updater from './updater';
import { initLocales } from './lang/initLocales';

const initAll = () => {
  const data = eventListener();
  initLocales();
  updater(data);
};

export default initAll;
