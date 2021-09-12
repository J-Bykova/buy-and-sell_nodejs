'use strict';

const version = require(`./versionjs`);
const help = require(`./help.js`);

const Cli = {
  [version.name]: version,
  [help.name]: help
};

module.exports = {
  Cli,
};
