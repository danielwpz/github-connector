'use strict';

function scoredResultService() {

  function merge(collections) {
    let result = [];

    collections.forEach(collection => {
      const sorted = collection.items.sort((a, b) => {
        return b.score - a.score;
      });

      result = result.concat(sorted.slice(0, 5));
    });

    return result;
  }

  return {
    merge
  };
}

module.exports = scoredResultService;