'use strict';

const logger = require('winston');
const _ = require('lodash');

function issueService(
  githubClientService,
  userService,
  collectionModel,
  scoredResultService,
  issueModel
) {

  function search(userId, options) {
    logger.debug(`issueService.search(${userId}, ${options})`);

    return githubClientService.getClient(userId)
      .then(client => {
        return userService.getOrgs(userId)
          .map(org => org.login)
          .then(orgs => orgs.concat([userId]))
          .map(user => client.search.issues(buildOptionForUser(options, user)))
          .map(collectionModel.buildScoredCollection(client, issueModel.build))
          .then(scoredResultService.merge);
      })
  }

  function buildOptionForUser(opt, user) {
    const query = `user:${user}+${opt.q}`;
    return _.assign({}, opt, { q: query });
  }

  return {
    search
  };

}

module.exports = issueService;