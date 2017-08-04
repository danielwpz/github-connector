'use strict';

function commitController(commitService, error, controllerWrap) {

  /**
   * Search commits
   * @param req
   *        req.query could contain: q, sort, order, page, per_page.
   *        see https://mikedeboer.github.io/node-github/#api-search-commits
   *        and https://developer.github.com/v3/search/#search-commits
   * @param res
   * @returns {*|Number}
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

      return commitService.search(req.params.user, opt);
    } else {
      throw new error.NotImplementedError();
    }
  }

  const controllers = {
    search
  };

  return controllerWrap.wrapAll(controllers);

}

module.exports = commitController;