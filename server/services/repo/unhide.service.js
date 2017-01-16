const Repo = require('../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function unhide (id) {
  const sQuery = {
    _id: new ObjectId(id)
  };
  const uQuery = {
    hidden: false
  };
  return Repo.findOneAndUpdate(sQuery, uQuery);
}