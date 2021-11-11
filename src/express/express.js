'use strict';

const express = require(`express`);
const logger = require(`./middleware/logger.js`);
const {DEFAULT_PORT} = require(`../constants`);
const offersRoutes = require(`./routes/offers-routes`);
const myRoutes = require(`./routes/my-routes`);

const app = express();

app.use(logger);

app.get(`/`, (req, res) => res.send(`/`));
app.get(`/register`, (req, res) => res.send(`/register`));
app.get(`/login`, (req, res) => res.send(`/login`));
app.get(`/search`, (req, res) => res.send(`/search`));
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);


app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`);
});
