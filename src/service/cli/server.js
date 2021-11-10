'use strict';
const chalk = require(`chalk`);
const http = require(`http`);
const {readFile} = require(`../../utils.js`);
const {HttpCode, FILENAME, DEFAULT_PORT, NOT_FOUND_MESSAGE_TEXT} = require(`../../constants`);

module.exports = {
  name: `--server`,
  run(port) {
    createServer(validationPort(port));
  }
};

function buildPage(content) {
  return `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${content}</body>
    </html>`;
}

function sendResponse(response, statusCode, message) {
  const html = buildPage(message);

  response.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  response.end(html);
}

async function clientConnect(request, response) {
  switch (request.url) {
    case `/`:
      try {
        const title = JSON.parse(await readFile(FILENAME))
          .map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(response, HttpCode.OK, `<ul>${title}</ul>`);
      } catch (err) {
        sendResponse(response, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE_TEXT);
      }
      break;
    default:
      sendResponse(response, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE_TEXT);
      break;
  }
}

// Создаем сервер
function createServer(port) {
  const server = http.createServer(clientConnect);
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

