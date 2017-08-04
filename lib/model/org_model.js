'use strict';

const _ = require('lodash');

function orgModel() {

  function build(obj) {
    const result = _.pick(obj, ['login', 'id', 'url', 'description']);

    return result;
  }

  return {
    build
  };
}

module.exports = orgModel;