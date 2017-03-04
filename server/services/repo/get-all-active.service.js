const Repo = require('../../models/repo.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function() {
  return Repo.find({ hidden: false })
  .populate('skills')
  .populate('trainingCenter', 'name logo hasLogo isPublic')
  .populate('developer', 'firstName lastName')
  .then((repos) => {
    return repos.map((repo) => {
      repo.trainingCenter = repo.trainingCenter.toObject({ getters: true });

      return repo;
    });
  })
  .then((repos) => {
    console.log(repos);
    return repos;
  });
}