const getData = (onSuccess, onFail) => fetch(' https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json()).then((photos) => {
    onSuccess(photos);
  })
  .catch((err) => {
    onFail(err);
  });

//const sendData = (body) => {};

export {getData};
