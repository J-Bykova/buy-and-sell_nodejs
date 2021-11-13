'use strict';
const chalk = require(`chalk`);
const {
  getRandomNum,
  getImgName,
  readFile,
  writeFile,
} = require(`../../utils.js`);
const {
  FILENAME,
  FILE_DESCRIPTION_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  DEFAULT_PUBLICATION_COUNT,
  MAX_PUBLICATION_COUNT,
  SUM,
  PICTURE,
  TYPE
} = require(`../../constants`);

module.exports = {
  name: `--generate`,
  async run(params) {
    const count = validateParam(params);
    const publications = await generatePublications(count);
    const output = formatOutput(publications);
    await writeFile(FILENAME, output);
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
