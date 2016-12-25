var mongoose = require('mongoose');
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

var Repo = mongoose.model('Repo', repoSchema);


// make this available to our users in our Node applications
module.exports = Repo;