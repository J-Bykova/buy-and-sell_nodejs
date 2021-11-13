'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.render(`partials/category.pug`));
offersRouter.get(`/add`, (req, res) => res.render(`new-ticket`));
offersRouter.get(`/edit/:id`, (req, res) => res.render(`ticket-edit`));
offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));

module.exports = offersRouter;
