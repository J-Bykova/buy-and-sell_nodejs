'use strict';

const DEFAULT_PORT = 3000;
const FILE_NAME = `mocks.json`;
const HTTP_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  HTTP_CODE,
  DEFAULT_PORT,
  FILE_NAME,
};
