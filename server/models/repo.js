const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const Schema = mongoose.Schema;
const Promise = require('promise');

const repoSchema = new Schema({
  name: String,
  developer: String,
  providerId: Number,
  languages: [String],
  description: String,
  plans: String,
  contents_url: String,
  contactInfo: String,
  createdAt: Number,
  trainingCenter: String,
  trainingCenterRequired: String,
  messageToTrainingCenter: String
});

repoSchema.statics.getTrainingCenterRepos = function (trainingCenterId) {
  return Promise.all([
    this.find({trainingCenterRequired: trainingCenterId}),
    this.find({trainingCenter: trainingCenterId})
  ]).then(function(results) {
    return {
      pending: results[0],
      approved: results[1]
    }
  });
}

repoSchema.statics.approveTrainingCenterStatus = function (params) {
  return this.findOneAndUpdate({
      '_id': ObjectId(params.repoId),
      trainingCenterRequired: params.trainingCenterId
    }, { 
      $set: { trainingCenter: params.trainingCenterId }, 
      $unset: {trainingCenterRequired: null }
    }, {new: true}).then(function (repo) {
      return repo;
    }, function (err) {
      return err;
    });
}
repoSchema.statics.disapproveTrainingCenterStatus = function (params) {
  return this.findOneAndUpdate({
    '_id': ObjectId(params.repoId),
    trainingCenter: params.trainingCenterId
  }, { $set: { trainingCenterRequired: params.trainingCenterId }, $unset: { trainingCenter: null }}, {new: true}).then(function () {

  }, function () {

  });
}

var Repo = mongoose.model('Repo', repoSchema);


// make this available to our users in our Node applications
module.exports = Repo;