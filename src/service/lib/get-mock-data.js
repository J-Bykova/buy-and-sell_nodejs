'use strict';
const {readFile} = require(`../../../utils`);
const {MOCKS_PATH} = require(`../../constants`);

let data = [];

async function getMockData() {
  if (data.length > 0) {
    return data;
  }

  try {
    const content = await readFile(MOCKS_PATH);
    data = JSON.parse(content);
  } catch (err) {
    console.error(err);
  }

  return data;
}

module.exports = getMockData;
