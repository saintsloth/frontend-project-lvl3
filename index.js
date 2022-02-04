import { eventListener } from './src/eventListener';
import { initLocales, initState } from './src/model';

eventListener();
initState();
initLocales();
