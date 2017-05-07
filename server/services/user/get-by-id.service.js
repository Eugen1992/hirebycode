const User = require('../../models/user.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function getById (id) {
  return User.findOne({ _id: ObjectId(id) });
}