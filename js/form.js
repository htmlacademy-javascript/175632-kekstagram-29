import {isEscapeKey} from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const hashtags = imgUploadForm.querySelector('.text__hashtags');
const imgUploadComments = imgUploadForm.querySelector('.text__description');

const getArray = (value) => value.split(' ');

hashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

imgUploadComments.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormImgUpload();
  }
};

const openFormImgUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUpload.addEventListener('change', openFormImgUpload);

function closeFormImgUpload () {
  imgUpload.value = '';
  hashtags.value = '';
  imgUploadComments.value = '';
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadCancel.addEventListener('click', closeFormImgUpload);

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
}, false);

const regHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

function validateHashtag (value) {
  let n = true;
  const hashtagsArray = getArray(value);
  hashtagsArray.forEach((element) => {
    if(!regHashtag.test(element)) {
      n = false;
    }
  });
  return n;
}

function validateHashtagsCopy (value) {
  const hashtagsArray = getArray(value);
  let n = true;
  for (let i = 0; i < hashtagsArray.length; i++) {
    for (let j = i + 1; j < hashtagsArray.length; j++) {
      if (hashtagsArray[i] === hashtagsArray[j]) {
        n = false;
      }
    }
  }
  return n;
}

function validateHashtagscount (value) {
  const hashtagsArray = getArray(value);
  return hashtagsArray.length <= 5;
}

function validateHashtagLength (value) {
  return value.length <= 20;
}

function validateComment (value) {
  return value.length <= 140;
}

pristine.addValidator(hashtags, validateHashtag, 'Хэш-тег невалидный');
pristine.addValidator(hashtags, validateHashtagsCopy, 'Хэш-теги повторяются');
pristine.addValidator(hashtags, validateHashtagscount, 'Максимальное количество хэш-тегов - 5');
pristine.addValidator(hashtags, validateHashtagLength, 'Максимальная длина хэш-тега 20 символов');

pristine.addValidator(imgUploadComments, validateComment, 'Максимальная длина комментария 140 символов');

imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
