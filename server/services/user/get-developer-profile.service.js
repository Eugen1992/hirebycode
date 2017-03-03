const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;
const cloudinary = require('cloudinary');

module.exports = function getDeveloperProfile ({ userId, withContacts }) {
  const sQuery = { _id: ObjectId(userId) };
  let projection = 'firstName lastName placeId profileReadyForPublic avatar';
  if (withContacts) {
    projection += ' contacts'
  }
  return User.findOne(sQuery, projection).then((user) => {
    if (process.env.ENV === 'production') {
      user.avatar = cloudinary.url(`folder-name/${user.avatar}`);
    } else {
      user.avatar = `/client/assets/images/developers-avatars/${user.avatar}`;
    }

    return user;
  });
}