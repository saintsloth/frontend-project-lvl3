const stateDefaultValues = {
  url: '',
  lang: 'ru',
};

const getState = () => JSON.parse(JSON.stringify(stateDefaultValues));

export default getState;
