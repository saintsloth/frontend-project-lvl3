export const state = {
  stateDefaultValues: {
    url: '',
    lang: 'ru',
  },
};

const initState = () => Object.assign(state, state.stateDefaultValues);

export default initState;
