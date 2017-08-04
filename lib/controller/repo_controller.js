'use strict';

const Promise = require('bluebird');

function repoController(error, controllerWrap, repoService) {

  /**
   * Search repositories
   * @param req
   *        req.query could contain: q, sort, order, page, per_page.
   *        see https://mikedeboer.github.io/node-github/#api-search-repos
   *        and https://developer.github.com/v3/search/#search-repositories
   * @param res
   * @returns {*}
   */
  function search(req, res) {
    if (req.query.q) {
      const opt = {
        q: req.query.q,
        sort: req.query.sort,
        order: req.query.order,
        page: req.query.page,
        per_page: req.query.per_page
      };
      return repoService.search(req.params.user, opt);
    } else {
      return repoService.getAll(req.params.user, {});
    }
  }

  const controllers = {
    search
  };

  return controllerWrap.wrapAll(controllers);
}

module.exports = repoController;