const Repo = require('../../../models/repo.js');
const utils = require('../../../models/utils/repo.utils.js');
const trainingCenterStatus = require('../../../models/constants/training-center-status.constants');

module.exports = function getTrainingCenterRepos (trainingCenterId) {
    return Promise.all([
      Repo.find({
        trainingCenter: trainingCenterId,
        trainingCenterStatus: trainingCenterStatus.PENDING,
        hidden: { $ne: true },
      })
          .populate('skills')
          .populate('developer'),
      Repo.find({
        trainingCenter: trainingCenterId,
        trainingCenterStatus: trainingCenterStatus.APPROVED,
        hidden: { $ne: true },
      })
        .populate('skills')
        .populate('developer')
        .populate('trainingCenter')
        .then((repos) => {
          return repos.map((repo) => {
            repo.trainingCenter = repo.trainingCenter.toObject({ getters: true });

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