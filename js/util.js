/* eslint-disable no-useless-return */
const ALERT_SHOW_TIME = 10000;
const filter = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const PHOTOS_COUNT = 10;

const imgFiltersElement = document.querySelector('.img-filters');
let photosCopy = [];
let currentFilter = filter.default;


const showAlert = (error) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = `При загрузке данных с сервера произошла ошибка запроса: ${error}`;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const sortRandom = () => Math.random() - 0.5;
const sortCommentsLength = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getSortedPhotos = () => {
  switch(currentFilter) {
    case filter.random:
      return [...photosCopy].sort(sortRandom).slice(0,PHOTOS_COUNT);
    case filter.discussed:
      return [...photosCopy].sort(sortCommentsLength);
    default:
      return [...photosCopy];
  }
};

const setOnFilterClick = (cb) => {
  imgFiltersElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const filterButton = evt.target;
    if (filterButton.id === currentFilter) {
      return;
    }

    imgFiltersElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    filterButton.classList.add('img-filters__button--active');
    currentFilter = filterButton.id;
    cb(getSortedPhotos());
  });
};

const initFilter = (loadedPhotos, cb) => {
  imgFiltersElement.classList.remove('img-filters--inactive');
  photosCopy = [...loadedPhotos];
  setOnFilterClick(cb);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, showAlert, initFilter, getSortedPhotos, debounce};
