import {randomDescription} from './data.js';
import {openBigPicture} from './picturesFull.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');


const otherPictures = randomDescription();

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
      openBigPicture(url, likes, comments,description);
    });
  });

  picturesContainerElement.appendChild(otherPicturesFragment);
};

export {renderPictures};
