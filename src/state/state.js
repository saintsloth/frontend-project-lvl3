// export const state = {
//   stateDefaultValues: {
//     url: '',
//     lang: 'ru',
//   },
// };

export const getState = () => {
  return {
    url: '',
    lang: 'ru',
  }
};

export default getState;
//
// const initState = () => Object.assign(state, state.stateDefaultValues);
//
// export default initState;
