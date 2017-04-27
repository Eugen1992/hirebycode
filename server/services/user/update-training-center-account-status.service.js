const User = require('../../models/user.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function updateTrainingCenters (trainingCenterId, { isPublic }) {
  const sQuery = { _id: ObjectId(trainingCenterId) };
  const uQuery = { isPublic };
  return User.findOneAndUpdate(sQuery, uQuery);
}