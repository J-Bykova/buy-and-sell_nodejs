'use strict';

const express = require(`express`);
const path = require(`path`);
const logger = require(`./middleware/logger.js`);
const {DEFAULT_PORT, PUBLIC_DIR} = require(`../constants`);
const offersRoutes = require(`./routes/offers-routes`);
const myRoutes = require(`./routes/my-routes`);

const app = express();

app.use(logger);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.get(`/register`, (req, res) => res.render(`sign-up`));
app.get(`/login`, (req, res) => res.render(`login`));
app.get(`/search`, (req, res) => res.render(`search-result`));
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.get(`/`, (req, res) => res.render(`main`));
app.use((req, res) => res.status(400).render(`errors/404`));
app.use((req, res) => res.status(500).render(`errors/500`));


app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`);
});
