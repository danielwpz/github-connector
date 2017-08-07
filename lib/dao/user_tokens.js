'use strict';
const Promise = require('bluebird');

function userTokenDAO(config) {
  const db = config.tokens;

  function saveToken(user, token) {
    db[user] = token;
    return Promise.resolve(token);
  }

  function getToken(user) {
    return Promise.resolve(db[user]);
  }

  return {
    saveToken,
    getToken
  };
}

module.exports = userTokenDAO;