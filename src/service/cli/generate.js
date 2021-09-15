'use strict';

const chalk = require(`chalk`);
const {getRandomNum} = require(`../../utils.js`);
const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];

const DESCRIPTION = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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

const getImgName = (minImg, maxImg) => {
  return `item${(getRandomNum(minImg, maxImg))}.jpg`;
};

const generateOffers = (count) => {
  const offers = [];
  for (let i = 0; i < count; i++) {
    offers.push({
      type: TYPE[getRandomNum(0, TYPE.length - 1)],
      title: TITLES[getRandomNum(0, TITLES.length - 1)],
      description: DESCRIPTION[getRandomNum(0, DESCRIPTION.length - 1)],
      sum: getRandomNum(SUM.MIN, SUM.MAX),
      picture: getImgName(PICTURE.MIN, PICTURE.MAX),
      category: CATEGORIES[getRandomNum(0, CATEGORIES.length - 1)],
    });
  }
  return offers;
};

module.exports = {
  name: `--generate`,
  run(params) {
    const count = Number(params[0]) || DEFAULT_COUNT;
    if (count > MAX_COUNT) {
      throw new Error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
    }
    const json = JSON.stringify(generateOffers(count), null, 4);

    fs.writeFileSync(FILE_NAME, json);
  }
};
