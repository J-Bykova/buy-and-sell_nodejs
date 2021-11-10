'use strict';

const DEFAULT_PORT = 8080;
const FILE_NAME = `mocks.json`;
const HTTP_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const NOT_FOUND_MESSAGE_TEXT = `Not found`;

const TEXT_HELP = `
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
service.js <command>

Команды:
--version:            выводит номер версии
--help:               печатает этот текст
--generate <count>    формирует файл mocks.json
`;

const FILE_DESCRIPTION_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const DEFAULT_PUBLICATION_COUNT = 1;
const MAX_PUBLICATION_COUNT = 1000;
const TYPE = [
  `offer`,
  `sale`,
];
const SUM = {
  MIN: 1000,
  MAX: 100000,
};
const PICTURE = {
  MIN: 1,
  MAX: 16,
};

module.exports = {
  HTTP_CODE,
  DEFAULT_PORT,
  FILE_NAME,
  NOT_FOUND_MESSAGE_TEXT,
  TEXT_HELP,
  FILE_DESCRIPTION_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  DEFAULT_PUBLICATION_COUNT,
  MAX_PUBLICATION_COUNT,
  SUM,
  PICTURE,
  TYPE,
};
