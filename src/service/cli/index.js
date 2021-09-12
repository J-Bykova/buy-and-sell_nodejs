'use strict';

const version = require(`./version.js`);
const help = require(`./help.js`);
const generate = require(`./generate.js`);

module.exports.Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate
};
