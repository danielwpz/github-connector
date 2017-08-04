'use strict';

const logger = require('winston');
const _ = require('lodash');

function commitService(
  githubClientService,
  commitModel,
  collectionModel,
  scoredResultService,
  userService
) {

  function search(userId, options) {
    logger.debug(`commitService.search(${userId}, ${options})`);

    return githubClientService.getClient(userId)
      .then(client => {
        return userService.getOrgs(userId)
          .map(org => org.login)
          .then(orgs => orgs.concat([userId]))
          .map(user => client.search.commits(buildOptionForUser(options, user)))
          .map(collectionModel.buildScoredCollection(client, commitModel.build))
          .then(scoredResultService.merge);
      });
  }

  function buildOptionForUser(opt, user) {
    const query = `user:${user}+${opt.q}`;
    return _.assign({}, opt, { q: query });
  }

  return {
    search
  };

}

module.exports = commitService;
