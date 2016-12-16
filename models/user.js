var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  githubId: String,
  githubLogin: String,
  token: String,
  contacts: String
});

userSchema.statics.updateContacts = function (contacts, login) {
  return this.find({ 
    githubLogin: login 
  }).limit(1).update({
    contacts: contacts
  });
}
userSchema.statics.getContacts = function (login) {
  return this.find({ 
    githubLogin: login 
  }).limit(1).then(function (user) {
    return user[0].contacts;
  });
}
var User = mongoose.model('User', userSchema);

module.exports = User;