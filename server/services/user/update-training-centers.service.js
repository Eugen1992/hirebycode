const User = require('../../models/user.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function updateTrainingCenters (developerId) {
  const sQuery = { _id: ObjectId(developerId) };

  return User.findOne(sQuery)
    .populate('repos')
    .then((user) => {
      return user.repos.reduce((allTrainingCenters, repo) => {
        const trainingCenterAllreadyPresent = allTrainingCenters.indexOf(repo.trainingCenterApproved) > -1;
        if (repo.hidden || trainingCenterAllreadyPresent) {
          return allTrainingCenters;
        }
        return repo.trainingCenterApproved ? [...allTrainingCenters, repo.trainingCenterApproved] : allTrainingCenters;
      }, []);
    })
    .then((trainingCenters) => {
      return User.findOneAndUpdate(sQuery, {
          $set: { trainingCenters }
      });
    });
}