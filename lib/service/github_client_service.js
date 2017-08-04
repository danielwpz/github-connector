'use strict';

const Promise = require('bluebird');
const NodeCache = require('node-cache');
const githubApi = require('github');
const logger = require('winston');

const cache = new NodeCache({ useClones: false });

function githubClientService(error, tokenService) {

  function getClient(user) {
    logger.debug(`githubClientService.getClient(${user})`);

    const client = cache.get(user);
    if (client) {
      return Promise.resolve(client);
    } else {
      return tokenService.getUserToken(user)
        .then(token => {
          if (token) {
            return createClient(token);
          } else {
            throw new error.BadRequestError('No token for user: ' + user);
          }
        })
        .tap(client => cache.set(user, client));
    }
  }

  function createClient(token) {
    logger.debug(`githubClientService.createClient(${token})`);

    const client = new githubApi({
      Promise
    });
    client.authenticate({
      type: 'token',
      token
    });

    return Promise.resolve(client);
  }

  return {
    getClient
  };
}

module.exports = githubClientService;