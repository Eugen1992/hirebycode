var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var developerSchema = new Schema({
  name: String,
  repos: Array
});

// the schema is useless so far
// we need to create a model using it
var Developer = mongoose.model('Developer', developerSchema);

// make this available to our users in our Node applications
module.exports = Developer;