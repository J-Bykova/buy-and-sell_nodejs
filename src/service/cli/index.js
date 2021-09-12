'use strict';

const version = require(`./version`);

const Cli = {
  [version.name]: version
};

module.exports = {
  Cli,
};
