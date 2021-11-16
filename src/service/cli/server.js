'use strict';
const express = require(`express`);
const chalk = require(`chalk`);
const {DEFAULT_PORT} = require(`../../constants`);
const offersRoutes = require(`./routers/offers-router`);

module.exports = {
  name: `--server`,
  run(port) {
    const PORT = validatePort(port);
    app.listen(PORT, (error) => {
      if (error) {
        console.error(chalk.red(error));
      } else {
        console.info(chalk.green(`Server is listening on port: ${PORT}`));
      }
    });
  }
};

const app = express();
app.use(express.json());
app.use(`/offers`, offersRoutes);

// Проверить параметры команды
function validatePort(port) {
  return Number(port[0]) || DEFAULT_PORT;
}
