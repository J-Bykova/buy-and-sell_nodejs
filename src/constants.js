'use strict';
const MOCKS_PATH = `mocks.json`;
const DEFAULT_PORT = 8080;
const HTTP_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
const PUBLIC_DIR = `public`;

module.exports = {
  MOCKS_PATH,
  DEFAULT_PORT,
  HTTP_CODE,
  PUBLIC_DIR,
};
