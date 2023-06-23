const DESCRIPTIONS_COUNT = 25;
const LIKES_NUMBER_MIN = 15;
const LIKES_NUMBER_MAX = 200;
const AVATAR_ID_MIN = 1;
const AVATAR_ID_MAX = 6;
const COMMENTS_NUMBER_MIN = 0;
const COMMENTS_NUMBER_MAX = 30;

const PHOTO_DESCRIPTION = [
  'Парк у дома',
  'Подснежники',
  'Осенний лес',
  'Озеро зимой',
  'Летний дождь'
];

const NAMES = [
  'Иван',
  'Дмитрий',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Кристина',
  'Алена',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function createIdGenerator() {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generatePhotoId = createIdGenerator();
const generateUrlId = createIdGenerator();

const getElement = (array) => array[getRandomInteger(0, array.length - 1)];

const createComment = (generateCommentId) => (
  {
    id: generateCommentId(),
    avatar: `img/avatar-${ getRandomInteger(AVATAR_ID_MIN, AVATAR_ID_MAX) }.svg`,
    message: getElement(MESSAGES),
    name: getElement(NAMES)
  });

const getComments = () => {
  const generateCommentId = createIdGenerator();
  return Array.from({ length: getRandomInteger(COMMENTS_NUMBER_MIN, COMMENTS_NUMBER_MAX)},() => createComment(generateCommentId));
};

const createDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${ generateUrlId() }.jpg`,
  description: getElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX),
  comments: getComments()
});

const randomDescription = Array.from({ length: DESCRIPTIONS_COUNT}, createDescription);

// eslint-disable-next-line no-console
console.log(randomDescription);


