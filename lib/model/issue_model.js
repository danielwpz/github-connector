'use strict';

const _ = require('lodash');

function issueModel(userModel) {

  function build(obj) {
    let result = _.pick(obj, ['id', 'url', 'title', 'state']);

    result.htmlUrl = obj.html_url;
    result.user = userModel.build(obj.user);

    return result;
  }

  return {
    build
  };

}

module.exports = issueModel;