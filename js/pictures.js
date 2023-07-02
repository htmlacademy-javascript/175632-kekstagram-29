import {randomDescription} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const otherPictures = randomDescription();

const otherPicturesFragment = document.createDocumentFragment();

otherPictures.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  otherPicturesFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(otherPicturesFragment);
