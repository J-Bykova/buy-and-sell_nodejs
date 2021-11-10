'use strict';

const chalk = require(`chalk`);
const {TEXT_HELP} = require(`../../constants`);

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.gray(TEXT_HELP));
  }
};
