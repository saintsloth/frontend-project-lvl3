export const buttonBlock = () => {
  const button = document.getElementById('rss-button');
  button.setAttribute('disabled', 'true');
  const input = document.getElementById('url-input');
  input.setAttribute('readonly', 'true');
};

export const buttonUnBlock = () => {
  const button = document.getElementById('rss-button');
  button.removeAttribute('disabled');
  const input = document.getElementById('url-input');
  input.removeAttribute('readonly');
};
