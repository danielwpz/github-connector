'use strict';

const _ = require('lodash');

module.exports = function (defaultConfig, developmentConfig) {
  return _.merge({}, defaultConfig, developmentConfig);
};