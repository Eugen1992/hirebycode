const Repo = require('../../models/repo.js');
const User = require('../../models/user.js');
const utils = require('../../models/utils/repo.utils.js');
const trainingCenterStatus = require('../../models/constants/training-center-status.constants');

module.exports = function getUserReposImported (userId, { onlyApprovedTrainingCenter } = {}) {
  const projection = onlyApprovedTrainingCenter
    ?  { trainingCenterStatus: 0, trainingCenterMessage: 0 }
    :  {};
  return Repo.find({developer: userId}, projection)
  .populate('skills')
  .populate('developer')
  .populate('trainingCenter')
  .then((repos) => {
    return repos.map((repo) => {
      if (onlyApprovedTrainingCenter && repo.trainingCenterStatus !== trainingCenterStatus.APPROVED) {
        repo.trainingCenter = null;
      }
      repo.trainingCenter = repo.trainingCenter && repo.trainingCenter.toObject();
      
      return repo;
    });
  });
}