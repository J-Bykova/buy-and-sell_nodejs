'use strict';

const {Cli} = require(`./cli`);

// Получаем переданные аргументы
const args = process.argv.slice(2);

// Получаем команду
const command = args[0];

// Получаем параметры
const params = args.slice(1);

// Если команда не переданна
if (!command) {
  console.log(`No command passed`);
  Cli[`--help`].run();
  process.exit(1);
}

// Проверяем что есть обработчик для этой команды
if (!Cli[command]) {
  console.log(`Unknown command: ${command}`);
  Cli[`--help`].run();
  process.exit(1);
}

Cli[command].run(params);
