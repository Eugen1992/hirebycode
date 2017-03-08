const Repo = require('../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function ({ repoId, trainingCenterId, approved }) {
  let sQuery;
  let uQuery;

  if (approved) {
    sQuery = {
      '_id': ObjectId(repoId),
      trainingCenter: trainingCenterId
    };
    uQuery = { 
      $set: { trainingCenterApproved: trainingCenterId }
    };
  } else {
    sQuery = {
      '_id': ObjectId(repoId),
      trainingCenterApproved: trainingCenterId
    };
    uQuery = { 
      $unset: { trainingCenterApproved: null }
    }
  }

  return Repo.findOneAndUpdate(sQuery, uQuery, {new: true})
  .then((repo) => {
    return repo;
  });
}