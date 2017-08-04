'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

function CollectionModel() {

  function Collection(items, getNext) {
    this.items = items;
    this.getNext = getNext;

    if (!items) {
      this.items = [];
    }

    if (!getNext) {
      this.getNext = () => Promise.resolve();
    }
  }

  Collection.buildScoredCollection = buildScoredCollection;

  function buildScoredCollection(client, buildFunc) {
    return function (result) {
      return new Collection(
        buildItems(result.data.items, buildFunc),
        buildNextFunction(client, result, buildFunc));
    };
  }

  function buildItems(items, buildFunc) {
    return _.map(items, (item) => {
      return {
        score: item.score,
        item : buildFunc(item)
      };
    });
  }


  function buildNextFunction(client, result, buildFunc) {
    return function () {
      if (client.hasNextPage(result)) {
        return client.getNextPage(result)
          .then(buildScoredCollection(client, buildFunc));
      } else {
        return Promise.resolve(new Collection());
      }
    };
  }

  return Collection;
}

module.exports = CollectionModel;