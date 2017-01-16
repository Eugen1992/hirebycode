const Repo = require('../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function hide (id) {
  const sQuery = {
    _id: new ObjectId(id)
  };
  const uQuery = {
    hidden: true
  };
  return Repo.findOneAndUpdate(sQuery, uQuery);
}