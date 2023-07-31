import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsListElement = document.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('#social__comment').content.querySelector('.social__comment');
const body = document.body;
let CommentsLoaderhandler;


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const generateComments = (comments) => {
  commentsListElement.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const commentElement = commentTemplateElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    if (i > 4) {
      commentElement.classList.add('hidden');
    }
    if (comments.length <= 5) {
      commentsLoaderElement.classList.add('hidden');
    } else {
      commentsLoaderElement.classList.remove('hidden');
    }
    commentsListElement.appendChild(commentElement);
  }
};

const loadComments = (comments, socialComments, n, commentCount) => {
  if (n + 5 < comments.length) {
    commentCount.textContent = n + 5;
    commentsLoaderElement.classList.remove('hidden');
    for (let i = n; i < n + 5; i++) {
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
  bigPictureCloseElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
  const socialComments = bigPictureElement.querySelectorAll('.social__comment');
  const commentCountElement = bigPictureElement.querySelector('.comments-count-shown');
  if (comments.length < 5) {
    commentCountElement.textContent = comments.length;
  } else {
    commentCountElement.textContent = 5;
  }
  CommentsLoaderhandler = returnCommentsLoaderhandler(comments, socialComments, commentCountElement);
  commentsLoaderElement.addEventListener('click', CommentsLoaderhandler);
};

function returnCommentsLoaderhandler(comments, socialComments, commentCountElement, n) {
  n = 0;
  return () => {
    if(comments.length > 5) {
      n += 5;
      loadComments(comments, socialComments, n, commentCountElement);
    }
  };
}

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCloseElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', CommentsLoaderhandler);
}

export {openBigPicture};


