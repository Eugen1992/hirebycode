const Repo = require('../../models/repo.js');
const User = require('../../models/user.js');
const utils = require('../../models/utils/repo.utils.js');


module.exports = function getUserReposImported (userId) {
  console.log('using imported service');
  return Repo.find({developer: userId})
  .populate('skills')
  .populate('developer')
  .populate('trainingCenterApproved')
  .then((repos) => {
    return repos.map((repo) => {
      repo.trainingCenterApproved = repo.trainingCenterApproved && repo.trainingCenterApproved.toObject();
      console.log(repo.trainingCenterApproved);
      return repo;
    });
  });
}