'use strict';
const chalk = require(`chalk`);
const http = require(`http`);
const {readFile} = require(`../../utils.js`);
const {FILE_NAME, HTTP_CODE, DEFAULT_PORT} = require(`../../constants`);
const NOT_FOUND_MESSAGE_TEXT = `Not found`;

module.exports = {
  name: `--server`,
  run(port) {
    createServer(validatePort(port));
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

async function onClientConnect(request, response) {
  switch (request.url) {
    case `/`:
      try {
        const title = JSON.parse(await readFile(FILE_NAME))
          .map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(response, HTTP_CODE.OK, `<ul>${title}</ul>`);
      } catch (err) {
        sendResponse(response, HTTP_CODE.NOT_FOUND, NOT_FOUND_MESSAGE_TEXT);
      }
      break;
    default:
      sendResponse(response, HTTP_CODE.NOT_FOUND, NOT_FOUND_MESSAGE_TEXT);
      break;
  }
}

// Создаем сервер
function createServer(port) {
  const server = http.createServer(onClientConnect);
  server.listen(port)
    .on(`listening`, () => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    })
    .on(`error`, ({message}) => {
      console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
    });
}

// Проверить параметры команды
function validatePort(port) {
  return Number(port[0]) || DEFAULT_PORT;
}

