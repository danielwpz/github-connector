'use strict';

/**
 * Error types for application code to use.
 * Will be mapped to http error when respond to client.
 */

const util = require('util');

function ErrorType() {
  Error.call(this);
}
util.inherits(ErrorType, Error);

function NoResourceError(detail) {
  ErrorType.call(this);
  this.detail = detail || 'Resource does not exist';
}
util.inherits(NoResourceError, ErrorType);

function NotAuthorizedError(detail) {
  ErrorType.call(this);
  this.detail = detail || 'Unauthorized';
}
util.inherits(NotAuthorizedError, ErrorType);

function NotImplementedError(detail) {
  ErrorType.call(this);
  this.detail = detail || 'Not implemented';
}
util.inherits(NotImplementedError, ErrorType);

function BadRequestError(detail) {
  ErrorType.call(this);
  this.detail = detail || 'Bad request';
}
util.inherits(BadRequestError, ErrorType);

function Errors(httpError) {

  function mapError(err) {
    if (err instanceof ErrorType) {
      if (err instanceof BadRequestError ||
          err instanceof NoResourceError) {
        return new httpError.clientError.BadRequestError(err.detail, err);
      } else if (err instanceof NotImplementedError) {
        return new httpError.serverError.NotImplementedError(err.detail, err);
      } else {
        return new httpError.serverError.InternalServerError(err.detail, err);
      }
    } else {
      return new httpError.serverError.InternalServerError(null, err);
    }
  }

  return {
    NoResourceError,
    NotAuthorizedError,
    NotImplementedError,
    BadRequestError,
    mapError
  };
}

module.exports = Errors;
