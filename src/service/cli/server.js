'use strict';
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

module.exports = {
  name: `--server`,
  run(port) {
    const serverPort = validationPort(port);
    createServer(serverPort);
  }
};

// Создаем сервер
function createServer(port) {
  let server = http.createServer();
  server.listen(port)
    .on(`listening`, (err) => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    })
    .on(`error`, ({message}) => {
      console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
    });
}

// Проверить параметры команды
function validationPort(port) {
  return Number(port[0]) || DEFAULT_PORT;
}

