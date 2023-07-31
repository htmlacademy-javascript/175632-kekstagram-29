const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__input');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
const EffectPreviews = document.querySelectorAll('.effects__preview');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreviewElement.src = URL.createObjectURL(file);
    EffectPreviews.forEach((element) => {
      element.style.backgroundImage = `url(${ imgUploadPreviewElement.src })`;
    });
  }
});
