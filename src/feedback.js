import onChange from 'on-change';

const feedbackDefaultValues = {
  text: '',
  color: '',
};

const feedback = JSON.parse(JSON.stringify(feedbackDefaultValues));

const watchedFeedback = onChange(feedback, (path, value) => {
  const feedbackNode = document.querySelector('.feedback');
  switch (path) {
    case 'text': {
      feedbackNode.textContent = value;
      break;
    }
    case 'color': {
      if (value === 'green') {
        feedbackNode.classList.remove('text-danger');
        feedbackNode.classList.add('text-success');
      }
      if (value === 'red') {
        feedbackNode.classList.remove('text-success');
        feedbackNode.classList.add('text-danger');
      }
      break;
    }
    default:
      throw new Error('Unknown feedback change');
  }
});

export default watchedFeedback;
