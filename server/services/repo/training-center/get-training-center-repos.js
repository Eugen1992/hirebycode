const Repo = require('../../../models/repo.js');
const utils = require('../../../models/utils/repo.utils.js');
const trainingCenterStatus = require('../../../models/constants/training-center-status.constants');

module.exports = function getTrainingCenterRepos (trainingCenterId) {
  const sortedRepos = {
    [trainingCenterStatus.PENDING]: [],
    [trainingCenterStatus.APPROVED]: [],
    [trainingCenterStatus.DECLINED]: [],
  }
    return Repo.find({
        trainingCenter: trainingCenterId,
        hidden: { $ne: true }
      })
      .populate('skills')
      .populate('developer')
      .then((repos) => {
        return repos.reduce((sortedRepos, repo) => {
          sortedRepos[repo.trainingCenterStatus].push(repo);
          return sortedRepos;
        }, sortedRepos);
      });
}