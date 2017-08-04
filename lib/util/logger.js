'use strict';

function Logger(config) {
  const options = config.logger.options || {};

  const logger = require('winston');

  // console logger
  logger.remove(logger.transports.Console);
  logger.add(logger.transports.Console, {
    level: options.level,
    levels: options.levels,
    handleExceptions: options.handle_exceptions,
    colorize: options.colorize,
    timestamp: options.timestamp,
    prettyPrint: options.pretty_print,
    silent: options.silent,
    label: options.label
  });

  // log levels and colors
  logger.setLevels(options.levels);
  logger.addColors(options.colors);

  return logger;
}

module.exports = Logger;