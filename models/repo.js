var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repoScheme = new Schema({
  name: String,
  developer: String,
  providerId: Number,
  languages: [String],
  description: String,
  plans: String,
  contents_url: String,
  contactInfo: String,
  createdAt: Number
});

// the schema is useless so far
// we need to create a model using it
var Repo = mongoose.model('Repo', repoScheme);

// make this available to our users in our Node applications
module.exports = Repo;