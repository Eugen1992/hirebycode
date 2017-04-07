const Repo = require('../../../models/repo');
const ObjectId = require('mongodb').ObjectId;
const trainingCenterStatus = require('../../../models/constants/training-center-status.constants');

module.exports = function updateRepo (repoId, data) {
  const sQuery = {
    _id: ObjectId(repoId)
  };
  const uQuery = { $set: data };
  
  return Repo.findOne(sQuery)
    .then((repo) => {
      if (!data.trainingCenter) {
        uQuery.$set.trainingCenterStatus = trainingCenterStatus.NONE;
        delete uQuery.$set.trainingCenterMessage;
        uQuery.$unset ={
          trainingCenterMessage: null
        };
      } else if (repo.trainingCenter !== data.trainingCenter) {
        uQuery.$set.trainingCenterStatus = trainingCenterStatus.PENDING;
        uQuery.$set.trainingCenterMessage = trainingCenterStatus.PENDING_MESSAGE;
      }

      return Repo.findOneAndUpdate(sQuery, uQuery, { new: true })
        .populate('skills')
        .populate('trainingCenter');
    });
}