import { initState } from './state/state';
import eventListener from './eventListener';
import updater from './updater';
import { initLocales } from './lang/initLocales';

const initAll = () => {
  initState();
  eventListener();
  initLocales();
  updater();
};

export default initAll;
