import initState from './state/state';
import eventListener from './eventListener';
import updater from './updater';
import { initLocales } from './lang/initLocales';

export default () => {
  const predicate = true;
  if (predicate) {
    initState();
    window.addEventListener('load', () => {
      eventListener();
      initLocales();
      updater();
    });
  }
};

// export default () => {
//   window.addEventListener('load', () => {
//     initState();
//     eventListener();
//     initLocales();
//     updater();
//   });
// };
