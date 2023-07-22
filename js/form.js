import {isEscapeKey} from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const hashtags = imgUploadForm.querySelector('.text__hashtags');
const imgUploadComments = imgUploadForm.querySelector('.text__description');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');
const effectLevel = imgUploadForm.querySelector('.effect-level__value');
const effectsRadio = imgUploadForm.querySelectorAll('.effects__radio');

const EFFECTS_CSS = [
  {name: 'grayscale', min: 0, max: 1, step: 0.1},
  {name: 'sepia', min: 0, max: 1, step: 0.1},
  {name: 'invert', min: 0, max: 100, step: 1},
  {name: 'blur', min: 0, max: 3, step: 0.1},
  {name: 'brightness', min: 1, max: 3, step: 0.1}
];

const EFFECTS_NAMES = [
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat'
];

effectsRadio.forEach((effectRadio) => {
  effectRadio.addEventListener('click', () => {
    const effect = effectRadio.value;
    applyEffect(effect);
  });
}
);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: effectLevel.value,
  step: 0.1,
  connect: 'lower',
});

function applyEffect (effect) {
  const index = EFFECTS_NAMES.indexOf(effect);
  const effectCss = EFFECTS_CSS[index].name;
  effectLevel.value = EFFECTS_CSS[index].max;
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: EFFECTS_CSS[index].min,
      max: EFFECTS_CSS[index].max,
    },
    start: effectLevel.value,
    step: EFFECTS_CSS[index].step,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    effectLevel.value = sliderElement.noUiSlider.get();
    imgUploadPreview.style.filter = `${effectCss }(${ effectLevel.value })`;
  });
}

scaleControlBigger.addEventListener('click', () => {
  let scaleControlNumber = parseInt(scaleControlValue.value, 10);
  if (scaleControlNumber < 100) {
    if (scaleControlNumber >= 0) {
      scaleControlNumber += 25;
      scaleControlValue.value = `${scaleControlNumber}%`;
      imgUploadPreview.style.transform = `scale(${ scaleControlNumber / 100 })`;
    }
  }
});

scaleControlSmaller.addEventListener('click', () => {
  let scaleControlNumber = parseInt(scaleControlValue.value, 10);
  if (scaleControlNumber > 0) {
    if (scaleControlNumber <= 100) {
      scaleControlNumber -= 25;
      scaleControlValue.value = `${scaleControlNumber}%`;
      imgUploadPreview.style.transform = `scale(${ scaleControlNumber / 100 })`;
    }
  }
});

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
  if (hashtagsArray === ['']) {
    n = true;
  } else {
    hashtagsArray.forEach((element) => {
      if (!regHashtag.test(element)) {
        n = false;
      }
    });
  }
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
