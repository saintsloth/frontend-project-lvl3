export const state = {
  stateDefaultValues: {
    url: '',
    lang: 'ru',
  },
};

export const initState = () => {
  Object.assign(state, state.stateDefaultValues);
};
