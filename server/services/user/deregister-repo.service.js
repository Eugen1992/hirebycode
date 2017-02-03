const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function deregisterRepo (userId, repoId) {
  const sQuery = { _id: ObjectId(userId) };

  const uQuery = {
    $pull: { repos: repoId.toString() }
  };
  return User.findOneAndUpdate(sQuery, uQuery);
}