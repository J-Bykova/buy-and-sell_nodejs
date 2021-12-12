'use strict';
const {Router} = require(`express`);
const getMockData = require(`../../lib/get-mock-data`);
const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  res.send(getMockData());
});

module.exports = offersRouter;
