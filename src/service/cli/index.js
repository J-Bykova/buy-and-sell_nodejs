'use strict';

const version = require(`./versionjs`);
const help = require(`./help.js`);
const generate = require(`./generate.js`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate
};

module.exports = {
  Cli,
};
