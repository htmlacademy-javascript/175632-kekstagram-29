import {isEscapeKey} from './util.js';

const COMMENTS_SHOWN = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsListElement = document.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('#social__comment').content.querySelector('.social__comment');
const body = document.body;
let onCommentsLoad;

const onBigPictureClose = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCloseElement.removeEventListener('click', onBigPictureClose);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoad);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
}

const generateComments = (comments) => {
  commentsListElement.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const commentElement = commentTemplateElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    if (i >= COMMENTS_SHOWN) {
      commentElement.classList.add('hidden');
    }
    if (comments.length <= COMMENTS_SHOWN) {
      commentsLoaderElement.classList.add('hidden');
    } else {
      commentsLoaderElement.classList.remove('hidden');
    }
    commentsListElement.appendChild(commentElement);
  }
};

const loadComments = (comments, socialComments, n, commentCount) => {
  if (n + COMMENTS_SHOWN < comments.length) {
    commentCount.textContent = n + COMMENTS_SHOWN;
    commentsLoaderElement.classList.remove('hidden');
    for (let i = n; i < n + COMMENTS_SHOWN; i++) {
      socialComments[i].classList.remove('hidden');
    }
  } else {
    for (let i = n; i < comments.length; i++) {
      socialComments[i].classList.remove('hidden');
    }
    commentCount.textContent = comments.length;
    commentsLoaderElement.classList.add('hidden');
  }
};

const openBigPicture = (url, likes, comments,description) => {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  generateComments(comments);
  body.classList.add('modal-open');
  bigPictureCloseElement.addEventListener('click', onBigPictureClose);
  document.addEventListener('keydown', onDocumentKeydown);
  const socialComments = bigPictureElement.querySelectorAll('.social__comment');
  const commentCountElement = bigPictureElement.querySelector('.comments-count-shown');
  if (comments.length < COMMENTS_SHOWN) {
    commentCountElement.textContent = comments.length;
  } else {
    commentCountElement.textContent = COMMENTS_SHOWN;
  }
  onCommentsLoad = returnCommentsLoaderhandler(comments, socialComments, commentCountElement);
  commentsLoaderElement.addEventListener('click', onCommentsLoad);
};

function returnCommentsLoaderhandler(comments, socialComments, commentCountElement, n) {
  n = 0;
  return () => {
    if(comments.length > COMMENTS_SHOWN) {
      n += COMMENTS_SHOWN;
      loadComments(comments, socialComments, n, commentCountElement);
    }
  };
}

export {openBigPicture};


