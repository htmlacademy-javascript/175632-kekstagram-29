import {renderPictures} from './pictures.js';
import './form.js';
import {setUserFormSubmit, closeFormImgUpload} from './form.js';
import {showAlert} from './util.js';
import {getData} from './api.js';

getData()
  .then((photos) => {
    renderPictures(photos);
  })
  .catch((err) => {
    showAlert(err);
  });

setUserFormSubmit(closeFormImgUpload);


