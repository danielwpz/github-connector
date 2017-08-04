'use strict';

function issueRoute(issueController) {

  function mount(route) {
    route.get('/:user/issue', issueController.search);
  }

  return {
    mount
  };
}

module.exports = issueRoute;