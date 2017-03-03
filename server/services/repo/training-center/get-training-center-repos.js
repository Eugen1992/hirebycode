const Repo = require('../../../models/repo.js');
const utils = require('../../../models/utils/repo.utils.js');

module.exports = function getTrainingCenterRepos (trainingCenterId) {
    return Promise.all([
      Repo.find({trainingCenterClaim: trainingCenterId})
          .populate('skills')
          .populate('developer'),
      Repo.find({trainingCenter: trainingCenterId})
        .populate('skills')
        .populate('developer')
        .populate('trainingCenter')
    ]).then(function(results) {
      return {
        pending: results[0],
        approved: results[1]
      }
    });
}