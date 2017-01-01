var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var Schema = mongoose.Schema;

var repoSchema = new Schema({
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

repoSchema.statics.getTrainingCenterRequests = function (trainingCenterId) {
  return this.find({trainingCenterRequired: trainingCenterId});
}

repoSchema.statics.approveTrainingCenterStatus = function (params) {
  return this.findOneAndUpdate({
      '_id': ObjectId(params.repoId),
      trainingCenterRequired: params.trainingCenterId
    }, { $set: { trainingCenter: params.trainingCenterId }}, {new: true}).then(function (repo) {
      return repo;
    }, function (err) {
      return err;
    });
}
repoSchema.statics.disapproveTrainingCenterStatus = function (params) {
  return this.findOneAndUpdate({
    '_id': ObjectId(params.repoId),
    trainingCenter: params.trainingCenterId
  }, { $set: { trainingCenter: null }}, {new: true}).then(function () {

  }, function () {

  });
}

var Repo = mongoose.model('Repo', repoSchema);


// make this available to our users in our Node applications
module.exports = Repo;