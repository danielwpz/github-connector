'use strict';

function repoRoute(repoController) {

  function mount(route) {
    route.get('/:user/repo', repoController.search);
  }

  return {
    mount
  };
}

module.exports = repoRoute;