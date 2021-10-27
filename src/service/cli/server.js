'use strict';
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {readFile} = require(`../../utils.js`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

module.exports = {
  name: `--server`,
  run(port) {
    createServer(validationPort(port));
  }
};

function sendResponse(response, statusCode, message) {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  response.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  response.end(template);
}

async function clientConnect(request, response) {
  const notFoundMessageText = `Not found`;
  switch (request.url) {
    case `/`:
      try {
        const title = JSON.parse(await readFile(FILENAME))
          .map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(response, HttpCode.OK, `<ul>${title}</ul>`);
      } catch (err) {
        sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;
    default:
      sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
}

// Создаем сервер
function createServer(port) {
  let server = http.createServer(clientConnect);
  server.listen(port)
    .on(`listening`, () => {
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

