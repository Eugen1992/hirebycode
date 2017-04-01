const Repo = require('../../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function ({ repoId, trainingCenterId, status, message }) {
  const sQuery = {
    '_id': ObjectId(repoId),
    trainingCenter: trainingCenterId
  };
  const uQuery = { 
    $set: { 
      trainingCenterStatus: status,
      trainingCenterMessage: message,
    }
  };

  return Repo.findOneAndUpdate(sQuery, uQuery, {new: true})
  .then((repo) => {

    return repo;
  });
}