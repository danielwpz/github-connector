'use strict';

function envService() {

  /*
   * reading node env is actually expensive,
   * so we cache it when app starts
   */
  const NODE_ENV = process.env.NODE_ENV;

  const nodeEnv = {
    isDevelopment: function () {
      return NODE_ENV === 'development';
    },
    isProduction: function () {
      return NODE_ENV === 'production';
    },
    isTest: function () {
      return NODE_ENV === 'test';
    }
  };

  return {
    nodeEnv
  };

}

module.exports = envService();