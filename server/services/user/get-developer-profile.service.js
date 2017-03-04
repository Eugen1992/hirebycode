const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function getDeveloperProfile ({ userId, withContacts }) {
  const sQuery = { _id: ObjectId(userId) };
  let projection = 'firstName lastName placeId profileReadyForPublic avatar';
  if (withContacts) {
    projection += ' contacts'
  }
  return User.findOne(sQuery, projection).toObject();
}