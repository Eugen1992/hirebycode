const User = require('../../models/user.js');
const ObjectId = require('mongodb').ObjectId;
const trainingCenterStatus = require('../../models/constants/training-center-status.constants');

module.exports = function updateTrainingCenters (developerId) {
  const sQuery = { _id: ObjectId(developerId) };

  return User.findOne(sQuery)
    .populate('repos')
    .then((user) => {
      return user.repos.reduce((allTrainingCenters, repo) => {
        if (!repo.trainingCenter) {
          return allTrainingCenters;
        }
        const trainingCenterAllreadyPresent = allTrainingCenters.indexOf(repo.trainingCenter) > -1;
        const trainingCenterNotApproved = repo.trainingCenterStatus !== trainingCenterStatus.APPROVED;

        if (trainingCenterNotApproved || repo.hidden || trainingCenterAllreadyPresent) {
          return allTrainingCenters;
        }
        return [...allTrainingCenters, repo.trainingCenter];
      }, []);
    })
    .then((trainingCenters) => {
      return User.findOneAndUpdate(sQuery, {
          $set: { trainingCenters }
      });
    });
}