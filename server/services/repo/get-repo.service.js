const Repo = require('../../models/repo.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function(repoId) {
  return Repo.findOne({_id: ObjectId(repoId)})
  .populate('skills')
  .populate('developer')
  .populate('trainingCenter')
  .then((repo) => {
    repo.trainingCenter = repo.trainingCenter.toObject({ getters: true });

    return repo;
  })
  .then((repo) => {
    return repo;
  });
}