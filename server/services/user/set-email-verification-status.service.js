const User = require('../../models/user.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function getById (id, { status }) {
  return User.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: {
        emailVerificationStatus: status
      }
    },
    {new: true});
};