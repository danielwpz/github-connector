'use strict';

const _ = require('lodash');

function userModel() {

  function build(obj) {
    const result = _.pick(obj, ['login', 'id', 'url', 'html_url']);

    result.id = '' + result.id;

    result.htmlUrl = result.html_url;
    delete result.html_url;

    return result;
  }

  return {
    build
  };

}

module.exports = userModel;