'use strict';
const {Router} = require(`express`);
const {readFile} = require(`../../../utils`);
const {FILE_NAME} = require(`../../../constants`);
const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const content = await readFile(FILE_NAME);
    const mocks = JSON.parse(content);
    res.json(mocks);
  } catch (err) {
    res.send([]);
  }
});

module.exports = offersRouter;
