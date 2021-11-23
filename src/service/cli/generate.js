'use strict';
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {
  getRandomNum,
  getImgName,
  readFile,
  writeFile,
} = require(`../../utils.js`);
const {FILE_NAME} = require(`../../constants`);
const FILE_DESCRIPTION_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const DEFAULT_PUBLICATION_COUNT = 1;
const MAX_PUBLICATION_COUNT = 1000;
const TYPE = [
  `offer`,
  `sale`,
];
const SUM = {
  MIN: 1000,
  MAX: 100000,
};
const PICTURE = {
  MIN: 1,
  MAX: 16,
};
const MAX_ID_LENGTH = 6;

module.exports = {
  name: `--generate`,
  async run(params) {
    const count = validateParam(params);
    const publications = await generatePublications(count);
    const output = formatOutput(publications);
    await writeFile(FILE_NAME, output);
  }
};

// Сгененировать данные
async function generatePublications(count) {
  const offers = [];
  const titleList = sanitizeData(await readFile(FILE_TITLES_PATH));
  const descriptionList = sanitizeData(await readFile(FILE_DESCRIPTION_PATH));
  const categoryList = sanitizeData(await readFile(FILE_CATEGORIES_PATH));

  for (let i = 0; i < count; i++) {
    offers.push({
      id: nanoid(MAX_ID_LENGTH),
      type: TYPE[getRandomNum(0, TYPE.length - 1)],
      title: titleList[getRandomNum(0, titleList.length - 1)],
      description: descriptionList[getRandomNum(0, descriptionList.length - 1)],
      sum: getRandomNum(SUM.MIN, SUM.MAX),
      picture: getImgName(PICTURE.MIN, PICTURE.MAX),
      category: categoryList[getRandomNum(0, categoryList.length - 1)],
    });
  }
  return offers;
}

// Проверить параметры команды
function validateParam(param) {
  const count = Number(param[0]) || DEFAULT_PUBLICATION_COUNT;
  if (count > MAX_PUBLICATION_COUNT) {
    throw new Error(chalk.red(`Не больше ${MAX_PUBLICATION_COUNT} объявлений`));
  }
  return count;
}

// Отформатировать файл
function sanitizeData(data) {
  return data
    .split(`\n`)
    .map((elem) => elem.trim())
    .filter((elem) => elem.length !== 0);
}

function formatOutput(publications) {
  return JSON.stringify(publications, null, 4);
}
