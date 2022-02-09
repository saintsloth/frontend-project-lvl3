export const buttonBlock = () => {
  const button = document.getElementById('rss-button');
  button.setAttribute('disabled', 'true');
};

export const buttonUnBlock = () => {
  const button = document.getElementById('rss-button');
  button.removeAttribute('disabled');
};
