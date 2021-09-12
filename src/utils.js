'use strict';

module.exports.getRandomNum = (minNum, maxNum) => {
  minNum = Math.ceil(minNum);
  maxNum = Math.floor(maxNum);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};
