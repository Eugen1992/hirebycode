const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function ({name, id}) {
  const sQuery = {
    _id: ObjectId(id)
  };

  const uQuery = {
    name,
    type: 'trainingCenter',
    isPublic: false
  };

  return User.findOneAndUpdate(sQuery, uQuery);
}