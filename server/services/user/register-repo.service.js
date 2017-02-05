const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function registerRepo (userId, repoId) {
  const sQuery = { _id: ObjectId(userId) };
  const uQuery = {
    $addToSet: { 
      repos: repoId
    }
  };
  return User.findOneAndUpdate(sQuery, uQuery);
}