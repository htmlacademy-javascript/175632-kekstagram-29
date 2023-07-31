import {renderPictures} from './pictures.js';
import './form.js';
import {setUserFormSubmit, closeFormImgUpload} from './form.js';
import {showAlert, initFilter, getSortedPhotos, debounce} from './util.js';
import {getData} from './api.js';
import './loadPhoto.js';

setUserFormSubmit(closeFormImgUpload);

getData(
  (photos) => {
    const debouncedrenderPictures = debounce(renderPictures);
    initFilter(photos, debouncedrenderPictures);
    renderPictures(getSortedPhotos());
  },
  (err) => showAlert(err));

