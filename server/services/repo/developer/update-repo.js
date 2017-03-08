const Repo = require('../../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function updateRepo (repoId, data) {
  const sQuery = {
    _id: ObjectId(repoId)
  };
  const uQuery = { $set: data };
  
  if (!data.trainingCenter) {
    delete uQuery.$set.trainingCenter;
    delete uQuery.$set.trainingCenterApproved;
    uQuery.$unset = { trainingCenter: null, trainingCenterApproved: null };
  }

  return Repo.update(sQuery, uQuery,  {new: true});
}