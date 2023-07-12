import {randomDescription} from './data.js';
import {openBigPicture} from './picturesFull.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const bigPictureElement = document.querySelector('.big-picture');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('#social__comment').content.querySelector('.social__comment');

const otherPictures = randomDescription();


const generateComments = (arrayComments) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  commentsList.innerHTML = '';

  for (let i = 0; i < arrayComments.length; i++) {
    commentElement.querySelector('.social__picture').src = arrayComments[i].avatar;
    commentElement.querySelector('.social__picture').alt = arrayComments[i].name;
    commentElement.querySelector('.social__text').textContent = arrayComments[i].message;
    commentsList.appendChild(commentElement);
  }
};

const renderPictures = () => {

  const otherPicturesFragment = document.createDocumentFragment();

  otherPictures.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    otherPicturesFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => {
      openBigPicture();
      bigPictureElement.querySelector('img').src = url;
      bigPictureElement.querySelector('.likes-count').textContent = likes;
      bigPictureElement.querySelector('.comments-count').textContent = comments.length;
      bigPictureElement.querySelector('.social__caption').textContent = description;
    });
    generateComments({comments});
  });

  picturesContainerElement.appendChild(otherPicturesFragment);
};

export {renderPictures};
