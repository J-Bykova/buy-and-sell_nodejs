'use strict';
const express = require(`express`);
const path = require(`path`);
const logger = require(`./middleware/logger.js`);
const {DEFAULT_PORT, PUBLIC_DIR} = require(`../constants.js`);
const offersRoutes = require(`./routers/offers-routers.js`);
const myRoutes = require(`./routers/my-routers.js`);
const mainRouter = require(`./routers/main-router.js`);
const registerRouter = require(`./routers/register-router.js`);
const loginRouter = require(`./routers/login-router.js`);
const searchRouter = require(`./routers/search-router.js`);
const errorsRouter = require(`./routers/errors-router.js`);

const app = express();

app.use(logger);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/`, mainRouter);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/search`, searchRouter);
app.use(`*`, errorsRouter);

app.listen(DEFAULT_PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Server is listening on port: ${DEFAULT_PORT}`);
  }
});
