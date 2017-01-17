const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function (userId, avatarFileName) {
  const sQuery = {
    _id: ObjectId(userId)
  };
  const uQuery = {
    avatar: avatarFileName
  }

  return User.findOneAndUpdate(sQuery, uQuery, { new: true });
}