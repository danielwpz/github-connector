'use strict';

/**
 * Error type that corresponds to HTTP errors.
 *
 * This class and its sub-classes should be used by response middleware.
 *
 * @param serverError
 * @param clientError
 * @returns {{serverError: *, clientError: *}}
 */

function error(serverError, clientError) {
  return {
    serverError,
    clientError
  };
}

module.exports = error;