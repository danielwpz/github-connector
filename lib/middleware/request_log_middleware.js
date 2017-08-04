'use strict';

const logger = require('winston');

function requestLogMiddleware() {

  function log(req, res, next) {
    req._reqTime = Date.now();
    logger.info(`${req.method}  ${req.originalUrl}`);
    next();
  }

  return {
    log
  };

}

module.exports = requestLogMiddleware;