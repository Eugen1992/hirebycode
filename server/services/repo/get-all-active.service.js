const Repo = require('../../models/repo.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = function() {
  return Repo.find({ hidden: false })
  .populate('skills')
  .populate('trainingCenter', 'name logo hasLogo isPublic')
  .populate('developer', 'firstName lastName')
  .then((repos) => {
    console.log(repos);
    return repos;
  });
}