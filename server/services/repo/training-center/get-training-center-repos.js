const Repo = require('../../../models/repo.js');
const utils = require('../../../models/utils/repo.utils.js');

module.exports = function getTrainingCenterRepos (trainingCenterId) {
    return Promise.all([
      Repo.find({trainingCenterRequired: trainingCenterId})
        .then(function(repos) {
          return Promise.all(repos.map(utils.addTrainingCenterInfo));
        }).then(function (repos) {
          return Promise.all(repos.map(utils.addAuthorInfo));
        }),
      Repo.find({trainingCenter: trainingCenterId})
        .then(function(repos) {
          return Promise.all(repos.map(utils.addTrainingCenterInfo));
        }).then(function (repos) {
          return Promise.all(repos.map(utils.addAuthorInfo));
        })
    ]).then(function(results) {
      return {
        pending: results[0], 
        approved: results[1]
      }
    });
}