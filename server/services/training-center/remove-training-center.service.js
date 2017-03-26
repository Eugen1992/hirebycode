const User = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function (id) {
  const sQuery = {
    _id: ObjectId(id)
  };
  return User.remove(sQuery).then(function(result) {
    return result;
  });
}
