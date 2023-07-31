import {isEscapeKey} from './util.js';
import {sendData} from './api.js';

const imgUploadFormElement = document.querySelector('.img-upload__form');
const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');
const imgUploadElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const body = document.body;
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const hashtagElement = imgUploadFormElement.querySelector('.text__hashtags');
const imgUploadCommentsElement = imgUploadFormElement.querySelector('.text__description');
const scaleControlSmallerElement = imgUploadFormElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imgUploadFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadFormElement.querySelector('.scale__control--value');
const imgUploadContainerElement = imgUploadFormElement.querySelector('.img-upload__preview');
const imgUploadPreviewElement = imgUploadContainerElement.querySelector('img');
const sliderContainerElement = imgUploadFormElement.querySelector('.img-upload__effect-level');
const sliderElement = imgUploadFormElement.querySelector('.effect-level__slider');
const effectLevelElement = imgUploadFormElement.querySelector('.effect-level__value');
const effectRadioButtons = imgUploadFormElement.querySelectorAll('.effects__radio');
const effectNoneElement = imgUploadFormElement.querySelector('#effect-none');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
let successContainerElement;
let errorContainerElement;


const EFFECTS_CSS = [
  {name: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  {name: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  {name: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  {name: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  {name: 'brightness', min: 1, max: 3, step: 0.1, unit: ''}
];

const EFFECTS_NAMES = [
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat'
];

sliderContainerElement.classList.add('hidden');
sliderElement.classList.add('hidden');

effectRadioButtons.forEach((effectRadio) => {
  effectRadio.addEventListener('click', () => {
    const effect = effectRadio.value;
    if (effect === 'none') {
      imgUploadPreviewElement.style.filter = 'none';
      sliderElement.classList.add('hidden');
      sliderContainerElement.classList.add('hidden');
    } else {
      sliderElement.classList.remove('hidden');
      sliderContainerElement.classList.remove('hidden');
      applyEffect(effect);
    }
  });
}
);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: effectLevelElement.value,
  step: 0.1,
  connect: 'lower',
});

function applyEffect (effect) {
  const index = EFFECTS_NAMES.indexOf(effect);
  const effectCss = EFFECTS_CSS[index].name;
  effectLevelElement.value = EFFECTS_CSS[index].max;
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: EFFECTS_CSS[index].min,
      max: EFFECTS_CSS[index].max,
    },
    start: effectLevelElement.value,
    step: EFFECTS_CSS[index].step,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    effectLevelElement.value = sliderElement.noUiSlider.get();
    imgUploadPreviewElement.style.filter = `${effectCss }(${ effectLevelElement.value }${EFFECTS_CSS[index].unit})`;
  });
}

scaleControlBiggerElement.addEventListener('click', () => {
  let scaleControlNumber = parseInt(scaleControlValueElement.value, 10);
  if (scaleControlNumber < 100) {
    if (scaleControlNumber >= 0) {
      scaleControlNumber += 25;
      scaleControlValueElement.value = `${scaleControlNumber}%`;
      imgUploadPreviewElement.style.transform = `scale(${ scaleControlNumber / 100 })`;
    }
  }
});

scaleControlSmallerElement.addEventListener('click', () => {
  let scaleControlNumber = parseInt(scaleControlValueElement.value, 10);
  if (scaleControlNumber > 0) {
    if (scaleControlNumber <= 100) {
      scaleControlNumber -= 25;
      scaleControlValueElement.value = `${scaleControlNumber}%`;
      imgUploadPreviewElement.style.transform = `scale(${ scaleControlNumber / 100 })`;
    }
  }
});

const getArray = (value) => value.trim().split(' ');


const onFormKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormImgUpload();
  }
};

const openFormImgUpload = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  imgUploadCancelElement.addEventListener('click', closeFormImgUpload);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
  hashtagElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  imgUploadCommentsElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
};

imgUploadElement.addEventListener('change', openFormImgUpload);

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
}, false);

const regHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtag = (value) => {
  let n = true;
  const hashtagsArray = getArray(value);
  if (hashtagsArray[0] === '') {
    n = true;
  } else {
    hashtagsArray.forEach((element) => {
      if (!regHashtag.test(element)) {
        n = false;
      }
    });
  }
  return n;
};

const validateHashtagsCopy = (value) => {
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
};

const validateHashtagscount = (value) => {
  const hashtagsArray = getArray(value);
  return hashtagsArray.length <= 5;
};

const validateHashtagLength = (value) => value.length <= 20;

pristine.addValidator(hashtagElement, validateHashtag, 'Хэш-тег невалидный');
pristine.addValidator(hashtagElement, validateHashtagsCopy, 'Хэш-теги повторяются');
pristine.addValidator(hashtagElement, validateHashtagscount, 'Максимальное количество хэш-тегов - 5');
pristine.addValidator(hashtagElement, validateHashtagLength, 'Максимальная длина хэш-тега 20 символов');

const successMessageElement = successTemplateElement.cloneNode(true);
const successButtonElement = successMessageElement.querySelector('.success__button');
successMessageElement.classList.add('hidden');
document.body.append(successMessageElement);

const errorMessageElement = errorTemplateElement.cloneNode(true);
const errorButtonElement = errorMessageElement.querySelector('.error__button');
errorMessageElement.classList.add('hidden');
document.body.append(errorMessageElement);

const onSuccessWindowKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessWindow();
  }
};

const onErrorWindowKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorWindow();
  }
};

const onWindowClickOutClose = (evt) => {
  if (evt.target === successContainerElement) {
    closeSuccessWindow ();
  }
  if (evt.target === errorContainerElement) {
    closeErrorWindow ();
  }
};

const showSuccessWindow = () => {
  successMessageElement.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessWindowKeydown);
  successContainerElement = document.querySelector('.success');
  successContainerElement.addEventListener('click', onWindowClickOutClose);
  successButtonElement.addEventListener('click', closeSuccessWindow);
};

const showErrorWindow = () => {
  errorMessageElement.classList.remove('hidden');
  document.addEventListener('keydown', onErrorWindowKeydown);
  errorButtonElement.addEventListener('click', closeErrorWindow);
  errorContainerElement = document.querySelector('.error');
  errorContainerElement.addEventListener('click', onWindowClickOutClose);
  document.removeEventListener('keydown', onFormKeydown);
};

function closeSuccessWindow () {
  successMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onSuccessWindowKeydown);
  successContainerElement.removeEventListener('click', onWindowClickOutClose);
  successButtonElement.removeEventListener('click', closeSuccessWindow);
}

function closeErrorWindow () {
  errorMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onErrorWindowKeydown);
  errorContainerElement.removeEventListener('click', onWindowClickOutClose);
  errorButtonElement.removeEventListener('click', closeErrorWindow);
  document.addEventListener('keydown', onFormKeydown);
}

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const setUserFormSubmit = () => {
  imgUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData);
    } else {
      evt.preventDefault();
    }
  });
};

function closeFormImgUpload () {
  imgUploadElement.value = '';
  hashtagElement.value = '';
  imgUploadCommentsElement.value = '';
  imgUploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormKeydown);
  pristine.reset();
  scaleControlValueElement.value = '100%';
  imgUploadPreviewElement.style.transform = 'none';
  sliderElement.classList.add('hidden');
  sliderContainerElement.classList.add('hidden');
  imgUploadPreviewElement.style.filter = 'none';
  effectNoneElement.checked = true;
  imgUploadCancelElement.removeEventListener('click', closeFormImgUpload);
}

export {closeFormImgUpload, showSuccessWindow, showErrorWindow, unblockSubmitButton, setUserFormSubmit};
