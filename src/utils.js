'use strict';
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

function getRandomNum(minNum, maxNum) {
  minNum = Math.ceil(minNum);
  maxNum = Math.floor(maxNum);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function getImgName(minImg, maxImg) {
  return `item${(getRandomNum(minImg, maxImg))}.jpg`;
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

// Записать файл
async function writeFile(path, content) {
  try {
    await fs.writeFile(path, content);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (e) {
    console.error(chalk.red(`Can't write data to file...`));
  }
}

function randomlySwapAllElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    const randomPosition = getRandomNum(0, arr.length - 1);
    const tempArr = arr[i];
    arr[i] = arr[randomPosition];
    arr[randomPosition] = tempArr;
  }

  return arr;
}

module.exports = {
  getRandomNum,
  getImgName,
  readFile,
  writeFile,
  randomlySwapAllElements,
};
