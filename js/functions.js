//Функция для проверки длины строки

function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('abc', 3);

//Функция для проверки, является ли строка палиндромом

function checkPalindrome (string) {
  const normalizeString = string.replaceAll(' ','').toLowerCase();
  let newString = '';
  const maxIndex = normalizeString.length - 1;
  for (let i = maxIndex; i >= 0; i--) {
    newString += normalizeString[i];
  }
  return newString === normalizeString;
}

checkPalindrome('Дом мод');

