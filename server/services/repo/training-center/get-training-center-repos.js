const Repo = require('../../../models/repo.js');
const utils = require('../../../models/utils/repo.utils.js');

module.exports = function getTrainingCenterRepos (trainingCenterId) {
    return Promise.all([
      Repo.find({
        trainingCenter: trainingCenterId,
        trainingCenterApproved: { $ne: trainingCenterId }
      })
          .populate('skills')
          .populate('developer'),
      Repo.find({trainingCenterApproved: trainingCenterId})
        .populate('skills')
        .populate('developer')
        .populate('trainingCenterApproved')
        .then((repos) => {
          return repos.map((repo) => {
            repo.trainingCenterApproved = repo.trainingCenterApproved.toObject({ getters: true });

            return repo;
          });
        })
    ]).then(function(results) {
      return {
        pending: results[0],
        approved: results[1]
      }
    });
}