import { eventListener, updater } from './src/state';
import { initState } from './src/state';
import { initLocales } from './src/lang';
// import { rssParser } from './src/rssParser';

eventListener();
initState();
initLocales();
updater();