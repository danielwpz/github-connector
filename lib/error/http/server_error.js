'use strict';

const util = require('util');

function InternalServerError(message, error) {
  Error.call(this);
  this.code = 500;
  this.message = message || 'Internal Error';
  this.error = error;
}

function NotImplementedError(message, error) {
  Error.call(this);
  this.code = 501;
  this.message = message || 'Not Implemented';
  this.error = error;
}

util.inherits(InternalServerError, Error);
util.inherits(NotImplementedError, Error);

function serverError() {
  return {
    InternalServerError,
    NotImplementedError
  };
}

module.exports = serverError;
