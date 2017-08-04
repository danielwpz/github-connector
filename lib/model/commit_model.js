'use strict';

const _ = require('lodash');

function commitModel(userModel, repoModel) {

  function build(obj) {
    let result = _.pick(obj, ['url', 'sha']);
    result.htmlUrl = obj.html_url;

    result.message = obj.commit.message;
    result.author = userModel.build(obj.author);
    result.repository = repoModel.build(obj.repository);

    return result;
  }

  return {
    build
  };

}

module.exports = commitModel;