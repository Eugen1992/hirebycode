const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function updateAccountStatus (userId, data) {
  const sQuery = {
    _id: ObjectId(userId),
    type: 'developer'
  };
  const uQuery = {
    $set: {
      hidden: data.hidden
    }
  };
  return User.findOneAndUpdate(sQuery, uQuery, { new: true }).then((user) => {
    return user;
  });
}