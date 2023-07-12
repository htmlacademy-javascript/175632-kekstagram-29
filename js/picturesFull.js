import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
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
    commentsList.appendChild(commentElement);
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
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCloseElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
}


export {openBigPicture};


