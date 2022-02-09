export const state = {};

const stateDefaultValues = {
  url: '',
  lang: 'ru',
};

export const initState = () => Object.assign(state, stateDefaultValues);
