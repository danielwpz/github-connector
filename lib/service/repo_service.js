'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const logger = require('winston');

function repoService(
  githubClientService,
  repoModel,
  userService,
  collectionModel,
  scoredResultService) {

  function getAll(userId, options) {
    logger.debug(`repoService.getAll(${userId}, ${options})`);

    return githubClientService.getClient(userId)
      .then(client => {
        return Promise.join(client, client.repos.getAll(options));
      })
      .spread((client, result) => {
        return {
          repos: _.map(result.data, repoModel.build),
          page: options.page || 1,
          hasNext: !! client.hasNextPage(result)
        };
      });
  }

  function search(userId, options) {
    logger.debug(`repoService.search(${userId}, ${options})`);

    return githubClientService.getClient(userId)
      .then(client => {
        return userService.getOrgs(userId)
          .map(org => org.login)
          .then(orgs => orgs.concat([userId]))
          .map(user => client.search.repos(buildOptionForUser(options, user)))
          .map(collectionModel.buildScoredCollection(client, repoModel.build))
          .then(scoredResultService.merge);
      });
  }

  function buildOptionForUser(opt, user) {
    const query = `user:${user}+${opt.q}`;
    return _.assign({}, opt, { q: query });
  }

  return {
    getAll,
    search
  };

}

module.exports = repoService;