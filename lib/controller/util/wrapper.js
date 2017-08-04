'use strict';

const _ = require('lodash');

function controllerWrap(responses, error) {

  function wrap(controller) {
    return function (req, res, next) {
      try {
        controller(req, res)
          .tap(result => {
            res.result = result instanceof responses.responseType ?
              result :
              new responses.okResponse(result);
            next();
          })
          .catch(e => {
            next(error.mapError(e));
          });
      } catch (e) {
        next(error.mapError(e));
      }
    }
  }

  function wrapAll(obj) {
    return _.mapValues(obj, wrap);
  }

  return {
    wrap,
    wrapAll
  };

}

controllerWrap._innModuleName = 'controllerWrap';
module.exports = controllerWrap;