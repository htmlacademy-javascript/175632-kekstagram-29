const getData = () => fetch(' https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json());

//const sendData = (body) => {};

export {getData};
