'use strict';

const express = require(`express`);
const path = require(`path`);

const DEFAULT_PORT = 3000;
const app = express();

app.get(`/`, (req, res) => {
  res.send(`<h1>Hello, Express.js!</h1>`);
});

app.use(express.static(path.join(__dirname, `../../`, `markup`)));

app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`);
});
