'use strict';
const {Router} = require(`express`);
const errorsRouter = new Router();

errorsRouter.get(`*`, (req, res) => res.status(400).render(`errors/404`));
errorsRouter.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).render(`errors/500`);
});

module.exports = errorsRouter;
