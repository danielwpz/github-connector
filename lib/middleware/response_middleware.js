'use strict';

const logger = require('winston');
const colors = require('colors/safe');

function responseMiddleware(error, httpError, envService) {

  /**
   * Respond with normal response
   * @param req
   * @param res
   * @param next
   */
  function respond(req, res, next) {
    const response = res.result;

    if (response) {
      logger.info(`${colors.green('' + response.code)}  ${req.method}  ${req.originalUrl} ${getProcessTime(req)}ms`);
      res.status(response.code).json(response.data);
      next();
    } else {
      // not found
      next(new httpError.clientError.NotFoundError());
    }
  }

  /**
   * Respond with error
   * @param err
   * @param req
   * @param res
   * @param next
   */
  function respondError(err, req, res, next) {
    let errorObject = {
      code: err.code || 500,
      message: err.message || 'Internal error'
    };

    if (envService.nodeEnv.isDevelopment() && err.error) {
      errorObject._error = err.error.message;
      errorObject._stack = err.error.stack;
    }

    if (errorObject.code >= 500) {
      logger.error(err);
      logger.error(err.error);
    }

    logger.info(`${errorObject.code}  ${req.method}  ${req.originalUrl} ${getProcessTime(req)}ms`);
    res.status(errorObject.code).json(errorObject);
  }

  function getProcessTime(req) {
    return Date.now() - req._reqTime;
  }

  return {
    respond,
    respondError
  };

}

module.exports = responseMiddleware;