const User = require('../../models/user');
const OnjectId = require('mongodb').ObjectId;

module.exports = function getTrainingCenter (id) {
  const sQuery = {
    _id: OnjectId(id)
  };

  const projection = 'name logo hasLogo website description';
  return User.findOne(sQuery, projection).then((user) => {
    return user.toObject();
  });
}