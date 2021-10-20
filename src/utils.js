'use strict';
function getRandomNum(minNum, maxNum) {
  minNum = Math.ceil(minNum);
  maxNum = Math.floor(maxNum);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function getImgName(minImg, maxImg) {
  return `item${(getRandomNum(minImg, maxImg))}.jpg`;
}

module.exports = {
  getRandomNum,
  getImgName,
};
