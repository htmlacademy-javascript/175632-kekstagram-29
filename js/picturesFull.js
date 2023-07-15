import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('#social__comment').content.querySelector('.social__comment');
const body = document.querySelector('body');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const generateComments = (comments) => {
  commentsList.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const commentElement = commentTemplateElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    if (i > 4) {
      commentElement.classList.add('hidden');
    }
    if (comments.length <= 5) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
    commentsList.appendChild(commentElement);
  }
};

const loadComments = (comments, socialComments, n, commentCount) => {
  if (n + 5 <= comments.length) {
    commentCount.textContent = n + 5;
    commentsLoader.classList.remove('hidden');
    for (let i = n; i < n + 5; i++) {
      socialComments[i].classList.remove('hidden');
    }
  } else {
    for (let i = n; i < comments.length; i++) {
      socialComments[i].classList.remove('hidden');
    }
    commentCount.textContent = comments.length;
    commentsLoader.classList.add('hidden');
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
  bigPictureCloseElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
  const socialComments = bigPictureElement.querySelectorAll('.social__comment');
  const commentCount = bigPictureElement.querySelector('.comments-count-shown');
  if (comments.length < 5) {
    commentCount.textContent = comments.length;
  } else {
    commentCount.textContent = 5;
  }
  let n = 0;
  commentsLoader.addEventListener('click', () => {
    if (comments.length > 5) {
      n += 5;
      loadComments(comments, socialComments, n, commentCount);
    }
  });
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCloseElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openBigPicture};


