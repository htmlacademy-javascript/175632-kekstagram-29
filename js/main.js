import {renderPictures} from './pictures.js';
import './form.js';
import {setUserFormSubmit, closeFormImgUpload} from './form.js';
import {showAlert} from './util.js';
import {getData} from './api.js';

getData(
  (photos) => {
    renderPictures(photos);
  },
  (err) => showAlert(err));

setUserFormSubmit(closeFormImgUpload);


