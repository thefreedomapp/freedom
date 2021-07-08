const chalk = require('chalk'),
  dev = require('./dev')();

// Simple logging
// Don't really think I need to document this one...
// But here we go...
module.exports = {
  // General information... nothing special, blue color, and prefixed with: [INFO]:
  info: (...data) => console.log(chalk.blue('[INFO]:'), ...data),
  // Error with a stack trace, red color, and prefixed with: [ERROR]:
  error: (...data) => console.trace(chalk.red('[ERROR]:'), ...data),
  // If we are in development mode, log this in green, with a prefixed with: [DEBUG]:
  // If we aren't in development mode, don't log this
  debug: (...data) => dev || console.trace(chalk.green('[DEBUG]:'), ...data),
  // Warn with a yellow color and prefixed with: [WARN]:
  warn: (...data) => console.trace(chalk.yellow('[WARN]:'), ...data)
};
