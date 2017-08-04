'use strict';

const _ = require('lodash');

function repoModel(userModel) {

  function build(obj) {
    let result = _.pick(obj, ['id', 'name', 'full_name', 'private',
                            'html_url', 'url', 'description']);

    result.fullName = result.full_name;
    delete result.full_name;

    result.htmlUrl = result.html_url;
    delete result.html_url;

    result.id = "" + result.id;
    result.description = result.description || '';

    result.owner = userModel.build(obj.owner);

    return result;
  }

  return {
    build
  };

}

module.exports = repoModel;