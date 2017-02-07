const Repo = require('../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function ({ repoId, trainingCenterId, approved }) {
  let sQuery;
  let uQuery;

  if (approved) {
    sQuery = {
      '_id': ObjectId(repoId),
      trainingCenterRequired: trainingCenterId
    };
    uQuery = { 
      $set: { trainingCenter: trainingCenterId }, 
      $unset: { trainingCenterRequired: null }
    };
  } else {
    sQuery = {
      '_id': ObjectId(repoId),
      trainingCenter: trainingCenterId
    };
    uQuery = { 
      $set: { trainingCenterRequired: trainingCenterId }, 
      $unset: { trainingCenter: null }
    }
  }

  return Repo.findOneAndUpdate(sQuery, uQuery, {new: true}).then(function (repo) {
    return repo;
  }, function (err) {
    return err;
  });
}