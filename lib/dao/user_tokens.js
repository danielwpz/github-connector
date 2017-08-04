'use strict';
const Promise = require('bluebird');

function userTokenDAO() {
  const db = {
    'danielwpz': '09575ceb6a596ba79a60a931693eb25e488bf46f'
  };

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