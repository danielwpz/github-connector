'use strict';

const util = require('util');

function responseType(code, data) {
  this.code = code;
  this.data = data;
}

function okResponse(data) {
  responseType.call(this, 200, data);
}
util.inherits(okResponse, responseType);

function createdResponse(data) {
  responseType.call(this, 201, data);
}
util.inherits(createdResponse, responseType);

function responses() {
  return {
    responseType,
    okResponse,
    createdResponse
  };
}


module.exports = responses;
