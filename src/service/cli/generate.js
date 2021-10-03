'use strict';

const chalk = require(`chalk`);
const fsPromises = require(`fs`).promises;
const {getRandomNum} = require(`../../utils.js`);

const FILE_DESCRIPTION_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
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

const getImgName = (minImg, maxImg) => {
  return `item${(getRandomNum(minImg, maxImg))}.jpg`;
};

const readContent = async (filePath) => {
  try {
    const content = await fsPromises.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, description) => {
  const offers = [];
  for (let i = 0; i < count; i++) {
    offers.push({
      type: TYPE[getRandomNum(0, TYPE.length - 1)],
      title: titles[getRandomNum(0, titles.length - 1)],
      description: description[getRandomNum(0, description.length - 1)],
      sum: getRandomNum(SUM.MIN, SUM.MAX),
      picture: getImgName(PICTURE.MIN, PICTURE.MAX),
      category: categories[getRandomNum(0, categories.length - 1)],
    });
  }
  return offers;
};

module.exports = {
  name: `--generate`,
  async run(params) {
    const count = Number(params[0]) || DEFAULT_COUNT;
    const description = await readContent(FILE_DESCRIPTION_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    if (count > MAX_COUNT) {
      throw new Error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
    }
    const json = JSON.stringify(generateOffers(count, titles, categories, description), null, 4);
    try {
      await fsPromises.writeFile(FILE_NAME, json);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
