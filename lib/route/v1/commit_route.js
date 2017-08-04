'use strict';

function commitRoute(commitController) {

  function mount(route) {
    route.get('/:user/commit', commitController.search);
  }

  return {
    mount
  };
}

module.exports = commitRoute;