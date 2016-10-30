var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  githubId: String,
  githubLogin: String,
  token: String
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;