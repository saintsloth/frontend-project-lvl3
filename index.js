// import { initState } from './src/state/state';
import { initLocales } from './src/lang/initLocales';
import updater from './src/updater';
import eventListener from './src/eventListener';

eventListener();
// initState();
initLocales();
updater();