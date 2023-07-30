const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const EffectsPreview = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    EffectsPreview.forEach((element) => {
      element.style.backgroundImage = `url(${ imgUploadPreview.src })`;
    });
  }
});
