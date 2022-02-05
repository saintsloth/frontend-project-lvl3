import onChange from 'on-change';
import _ from 'lodash';
import { localeInstance } from './lang/localeInstanse';

const data = {
  feeds: [],
  posts: [],
};

const postContainer = document.querySelector('.posts');
const feedsContainer = document.querySelector('.feeds');
const footer = document.querySelector('footer');

const fadeBody = () => {
  const body = document.querySelector('body');
  body.classList.add('modal-open');
  body.setAttribute('style', 'overflow: hidden; padding-right: 0px;');
  const fade = document.createElement('div');
  fade.classList.add('modal-backdrop', 'fade', 'show');
  footer.append(fade);
};

const unFadeBody = () => {
  const body = document.querySelector('body');
  body.classList.remove('modal-open');
  body.removeAttribute('style');
  const modal = document.querySelector('.modal-backdrop');
  if (modal !== null) modal.remove();
};

const modalCloseHandler = (e) => {
  if (e.currentTarget.classList.contains('fade') || e.currentTarget.tagName === 'BUTTON') {
    unFadeBody();
    const modal = document.getElementById('modal');
    if (modal !== null) modal.remove();
  }
};

const createModal = (title, link, description) => {
  const modalFadeShow = document.createElement('div');
  modalFadeShow.classList.add('modal', 'fade', 'show');
  modalFadeShow.id = 'modal';
  modalFadeShow.setAttribute('tabindex', '-1');
  modalFadeShow.setAttribute('aria-labelledby', 'modal');
  modalFadeShow.setAttribute('style', 'display: block;');
  modalFadeShow.setAttribute('aria-modal', 'true');
  modalFadeShow.setAttribute('role', 'dialog');
  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'dialog');
  modalDialog.setAttribute('role', 'document');
  modalFadeShow.append(modalDialog);
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');
  modalContent.append(modalHeader);
  const h5 = document.createElement('h5');
  h5.classList.add('modal-title');
  h5.textContent = title;
  modalHeader.append(h5);
  const modalCloseButton = document.createElement('button');
  modalCloseButton.classList.add('btn-close', 'close');
  modalCloseButton.setAttribute('type', 'button');
  modalCloseButton.setAttribute('data-bs-dismiss', 'modal');
  modalCloseButton.setAttribute('aria-label', 'Close');
  modalHeader.append(modalCloseButton);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalBody.textContent = description;
  modalContent.append(modalBody);

  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');
  modalContent.append(modalFooter);
  const modalA = document.createElement('a');
  modalA.classList.add('btn', 'btn-primary', 'full-article');
  modalA.href = link;
  modalA.setAttribute('role', 'button');
  modalA.setAttribute('target', '_blank');
  modalA.setAttribute('rel', 'noopener noreferrer');
  modalA.text = localeInstance.t('readAll');
  modalFooter.append(modalA);
  const modalButton = document.createElement('button');
  modalButton.classList.add('btn', 'btn-secondary');
  modalButton.setAttribute('type', 'button');
  modalButton.setAttribute('data-bs-dismiss', 'modal');
  modalButton.textContent = localeInstance.t('close');
  modalFooter.append(modalButton);

  modalButton.addEventListener('click', modalCloseHandler);
  modalCloseButton.addEventListener('click', modalCloseHandler);
  modalFadeShow.addEventListener('click', modalCloseHandler);

  return modalFadeShow;
};

const createPostEl = (title, link, description, viewed) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  const a = document.createElement('a');
  if (viewed) a.classList.add('fw-normal', 'link-secondary');
  else a.classList.add('fw-bold');
  a.setAttribute('href', 'URL');
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferrer');
  a.textContent = title;
  a.href = link;
  li.append(a);
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', 'modal');
  button.textContent = localeInstance.t('view');
  button.addEventListener('click', (e) => {
    fadeBody();
    e.target.previousElementSibling.classList.remove('fw-bold');
    e.target.previousElementSibling.classList.add('fw-normal', 'link-secondary');
    _.find(data.posts, (post) => post.title === title).viewed = true;
    const body = document.querySelector('body');
    const modal = createModal(title, link, description);
    body.prepend(modal);
  });
  li.append(button);
  return li;
};

const createFeedEl = (title, description) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'border-0', 'border-end-0');
  const h3 = document.createElement('h3');
  h3.classList.add('h6', 'm-0');
  h3.textContent = title;
  li.append(h3);
  const p = document.createElement('p');
  p.classList.add('m-0', 'small', 'text-black-50');
  p.textContent = description;
  li.append(p);
  return li;
};

const createCard = (title) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = title;
  cardBody.append(cardTitle);
  return card;
};

const createUL = () => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  return ul;
};

const watchedData = onChange(data, (path) => {
  switch (path) {
    case 'feeds': {
      if (document.querySelector('.feeds *')) {
        const feedsUL = document.querySelector('.feeds .list-group');
        feedsUL.innerHTML = '';
        data.feeds.forEach((feed) => feedsUL.append(createFeedEl(feed.title, feed.description)));
      } else {
        const feedsCard = createCard(localeInstance.t('feeds'));
        const feedsUL = createUL();
        feedsContainer.append(feedsCard);
        feedsCard.append(feedsUL);
        data.feeds.forEach((feed) => feedsUL.append(createFeedEl(feed.title, feed.description)));
      }
      break;
    }
    default: {
      if (document.querySelector('.posts *')) {
        const postsUL = document.querySelector('.posts .list-group');
        postsUL.innerHTML = '';
        data.posts
          .sort((first, second) => ((first.date > second.date) ? 1 : -1))
          .forEach((post) => postsUL.append(createPostEl(
            post.title,
            post.link,
            post.description,
            post.viewed,
          )));
      } else {
        const postsCard = createCard(localeInstance.t('posts'));
        const postsUL = createUL();
        postsCard.append(postsUL);
        postContainer.append(postsCard);
        data.posts
          .sort((first, second) => ((first.date > second.date) ? 1 : -1))
          .forEach((post) => postsUL.append(createPostEl(post.title, post.link, post.description)));
      }
    }
  }
});

export default watchedData;
