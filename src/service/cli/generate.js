'use strict';
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomNum, getImgName} = require(`../../utils.js`);

const FILE_DESCRIPTION_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_NAME = `mocks.json`;
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
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

module.exports = {
  name: `--generate`,
  async run(params) {
    const count = validationParam(params);
    const publications = await generatePublications(count);
    const output = formatOutput(publications);
    await writeFile(FILE_NAME, output);
  }
};

// Записать файл
async function writeFile(path, content) {
  try {
    await fs.writeFile(path, content);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (e) {
    console.error(chalk.red(`Can't write data to file...`));
  }
}

// Сгененировать данные
async function generatePublications(count) {
  const offers = [];
  const titleList = sanitizeData(await readFile(FILE_TITLES_PATH));
  const descriptionList = sanitizeData(await readFile(FILE_DESCRIPTION_PATH));
  const categoryList = sanitizeData(await readFile(FILE_CATEGORIES_PATH));

  for (let i = 0; i < count; i++) {
    offers.push({
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
function validationParam(param) {
  const count = Number(param[0]) || DEFAULT_COUNT;
  if (count > MAX_COUNT) {
    throw new Error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
  }
  return count;
}

// Прочитать файл
async function readFile(path) {
  try {
    return await fs.readFile(path, `utf8`);
  } catch (err) {
    console.error(chalk.red(err));
    return ``;
  }
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
