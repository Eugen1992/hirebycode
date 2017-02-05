const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const Schema = mongoose.Schema;
const Promise = require('promise');
const User = require('./user.js');

const utils = require('./utils/repo.utils.js');

const repoSchema = new Schema({
  name: String,
  developer: {type: String, ref: 'User'},
  providerId: Number,
  skills: [{type: String, ref: 'Skill'}],
  description: String,
  plans: String,
  hidden: Boolean,
  contents_url: String,
  createdAt: Number,
  trainingCenter: {type: String, ref: 'User'},
  trainingCenterRequired: String
});

repoSchema.statics.getTrainingCenterRepos = function (trainingCenterId) {
  return Promise.all([
    this.find({trainingCenterRequired: trainingCenterId})
      .then(function(repos) {
        return Promise.all(repos.map(utils.addTrainingCenterInfo));
      }).then(function (repos) {
        return Promise.all(repos.map(utils.addAuthorInfo));
      }),
    this.find({trainingCenter: trainingCenterId})
      .then(function(repos) {
        return Promise.all(repos.map(utils.addTrainingCenterInfo));
      }).then(function (repos) {
        return Promise.all(repos.map(utils.addAuthorInfo));
      })
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
      $unset: { trainingCenterRequired: null }
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
  }, { $set: { trainingCenterRequired: params.trainingCenterId }, 
       $unset: { trainingCenter: null }}, {new: true})
  .then(function (repo) {
    return repo;
  }, function (err) {
    return err;
  });
}

var Repo = mongoose.model('Repo', repoSchema);


// make this available to our users in our Node applications
module.exports = Repo;