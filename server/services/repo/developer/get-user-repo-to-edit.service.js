const Repo = require('../../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function getUserRepoToEdit (repoId) {
  const sQuery = {
    _id: ObjectId(repoId)
  };
  
  return Repo.findOne(sQuery)
   .populate('skills');
}