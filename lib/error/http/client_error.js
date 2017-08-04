'use strict';

const util = require('util');

function BadRequestError(message, error) {
  Error.call(this);
  this.code = 400;
  this.message = message || 'Bad request';
  this.error = error;
}

function NotFoundError(message, error) {
  Error.call(this);
  this.code = 404;
  this.message = message || 'Cannot find requested resource';
  this.error = error;
}

util.inherits(BadRequestError, Error);
util.inherits(NotFoundError, Error);

function clientError() {
  return {
    BadRequestError,
    NotFoundError
  };
}

module.exports = clientError;
