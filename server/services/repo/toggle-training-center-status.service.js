const Repo = require('../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function ({ repoId, trainingCenterId, approved }) {
  let sQuery;
  let uQuery;

  if (approved) {
    sQuery = {
      '_id': ObjectId(repoId),
      trainingCenterClaim: trainingCenterId
    };
    uQuery = { 
      $set: { trainingCenter: trainingCenterId }, 
      $unset: { trainingCenterClaim: null }
    };
  } else {
    sQuery = {
      '_id': ObjectId(repoId),
      trainingCenter: trainingCenterId
    };
    uQuery = { 
      $set: { trainingCenterClaim: trainingCenterId }, 
      $unset: { trainingCenter: null }
    }
  }

  return Repo.findOneAndUpdate(sQuery, uQuery, {new: true})
  .then((repo) => {
    return repo;
  });
}