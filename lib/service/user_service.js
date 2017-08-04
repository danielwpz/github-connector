'use strict';

const logger = require('winston');

function userService(githubClientService, orgModel) {

  function getOrgs(user) {
    logger.debug(`userService.getOrgs(${user})`);

    return githubClientService.getClient(user)
      .then(client => client.users.getOrgs({}))
      .then(results => results.data.map(orgModel.build));
  }

  return {
    getOrgs
  };

}

module.exports = userService;