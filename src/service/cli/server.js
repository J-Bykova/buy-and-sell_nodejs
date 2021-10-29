'use strict';
const chalk = require(`chalk`);
const http = require(`http`);
const {readFile} = require(`../../utils.js`);
const {HTTP_CODE, FILE_NAME, DEFAULT_PORT} = require(`../../constants`);

module.exports = {
  name: `--server`,
  run(port) {
    createServer(validatePort(port));
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
        const title = JSON.parse(await readFile(FILE_NAME))
          .map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(response, HTTP_CODE.OK, `<ul>${title}</ul>`);
      } catch (err) {
        sendResponse(response, HTTP_CODE.NOT_FOUND, notFoundMessageText);
      }
      break;
    default:
      sendResponse(response, HTTP_CODE.NOT_FOUND, notFoundMessageText);
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
function validatePort(port) {
  return Number(port[0]) || DEFAULT_PORT;
}

