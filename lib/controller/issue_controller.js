'use strict';

function issueController(issueService, error, controllerWrap) {

  function search(req, res) {
    if (req.query.q) {
      const opt = {
        q: req.query.q,
        sort: req.query.sort,
        order: req.query.order,
        page: req.query.page,
        per_page: req.query.per_page
      };

      return issueService.search(req.params.user, opt);
    } else {
      throw new error.NotImplementedError();
    }
  }

  const controllers = {
    search
  };

  return controllerWrap.wrapAll(controllers);
}

module.exports = issueController;