'use strict';

const Promise = require('bluebird');
const NodeCache = require('node-cache');
const logger = require('winston');

function tokenService(userTokens) {
  const tokenCache = new NodeCache({ useClones: false });

  function getUserToken(user) {
    logger.debug(`userService.getUserToken(${user})`);

    const token = tokenCache.get(user);
    if (!token) {
      return userTokens.getToken(user)
        .tap(t => tokenCache.set(user, t))
    } else {
      return Promise.resolve(token);
    }
  }

  function setUserToken(user, token) {
    return userTokens.saveToken(user, token)
      .tap(t => tokenCache.set(user, t));
  }

  return {
    getUserToken,
    setUserToken,
  }

}

module.exports = tokenService;