'use strict';

const _ = require('lodash');

module.exports = function (defaultConfig, developmentConfig, localConfig) {
  return _.merge({}, defaultConfig, developmentConfig, localConfig);
};