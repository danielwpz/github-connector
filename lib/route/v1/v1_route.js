'use strict';

function v1Route(
  repoRoute,
  commitRoute,
  issueRoute
) {

  function mount(route) {
    repoRoute.mount(route);
    commitRoute.mount(route);
    issueRoute.mount(route);
  }

  return {
    mount
  };

}

module.exports = v1Route;