const User = require('../../models/user.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function updateTrainingCenters (developerId) {
  const sQuery = { _id: ObjectId(developerId) };

  return User.findOne(sQuery)
    .populate('repos')
    .then((user) => {
      return user.repos.reduce((allTrainingCenters, repo) => {
        if (repo.hidden) {
          return allTrainingCenters;
        }
        return repo.trainingCenter ? [...allTrainingCenters, repo.trainingCenter] : allTrainingCenters;
      }, []);
    })
    .then((trainingCenters) => {
      return User.findOneAndUpdate(sQuery, {
          $set: { trainingCenters }
      });
    });
}