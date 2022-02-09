// import initState from './state/state';
import eventListener from './eventListener';
import updater from './updater';
import { initLocales } from './lang/initLocales';

export default () => {
  // initState();
  eventListener();
  initLocales();
  updater();
};

// export default () => {
//   window.addEventListener('load', () => {
//     initState();
//     eventListener();
//     initLocales();
//     updater();
//   });
// };
