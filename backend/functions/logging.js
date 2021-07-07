const chalk = require('chalk');

module.exports = {
  info: (...data) => console.log(chalk.blue('[INFO]:'), ...data),
  error: (...data) => console.trace(chalk.red('[ERROR]:'), ...data),
  debug: (...data) =>
    process.argv[2] !== '--production' ||
    process.argv[2] !== '-p' ||
    console.trace(chalk.green('[DEBUG]:'), ...data),
  warn: (...data) => console.trace(chalk.yellow('[WARN]:'), ...data)
};
