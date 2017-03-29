const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function (userId, data) {
  const sQuery = {
    _id: ObjectId(userId)
  }
  const uQuery = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    placeId: data.placeId,
    position: data.position,
  }

  return User.findOneAndUpdate(sQuery, uQuery, { new: true })
    .then((user) => {
      return User.findOneAndUpdate(sQuery, { profileReadyForPublic: checkIsReadyForPublic(user) }, {new: true});
  });
}

function checkIsReadyForPublic (user) {
  const { firstName, lastName, email, placeId } = user;
  return firstName && lastName && email && placeId;
}