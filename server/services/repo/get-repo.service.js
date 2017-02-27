const Repo = require('../../models/repo.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function(repoId) {
  return Repo.findOne({_id: ObjectId(repoId)})
  .populate('skills')
  .populate('developer')
  .populate('trainingCenter')
  .then((repo) => {
    return repo;
  });
}