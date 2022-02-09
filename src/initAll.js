import { initState } from './state/state';
import eventListener from './eventListener';
import updater from './updater';
import { initLocales } from './lang/initLocales';
import { initData } from './data';

const initAll = () => {
  initState();
  initData();
  eventListener();
  initLocales();
  updater();
};

export default initAll();

// export default () => {
//   window.addEventListener('load', () => {
//     initState();
//     eventListener();
//     initLocales();
//     updater();
//   });
// };
