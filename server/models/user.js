var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectId;

var userSchema = new Schema({
  name: String,
  firstName: String,
  lastName: String,
  type: String,
  githubId: String,
  githubLogin: String,
  token: String,
  contacts: String,
  hasLogo: Boolean,
  logo: String,
  isPublic: Boolean
});

userSchema.statics.getDeveloperById = function (id) {
  return this.find({
    '_id': ObjectId(id)
  }).limit(1).then(function([user]) {
    return user;
  });
}
userSchema.statics.updateContacts = function (params, id) {
  return this.find({ 
    _id: ObjectId(id) 
  }).limit(1).update({
    contacts: params.contacts,
    firstName: params.firstName,
    lastName: params.lastName
  });
}
userSchema.statics.getContacts = function (id) {
  return this.find({ 
    '_id': ObjectId(id) 
  }).limit(1).then(function ([user]) {
    return {
      contacts: user.contacts,
      firstName: user.firstName,
      lastName: user.lastName
    };
  });
}
userSchema.statics.getContactsById = function (userId) {
  return this.find({ 
    '_id': ObjectId(userId)
  }).limit(1).then(function (user) {
    return user[0].contacts;
  });
}
userSchema.statics.getTrainingCenter = function (userId) {
  return this.find({ 
    '_id': ObjectId(userId)
  }).limit(1).then(function (user) {
    return {
      name: user.name,
      logo: user.logo,
      type: user.type,
      hasLogo: user.hasLogo,
      isPublic: user.isPublic
    };
  });
}
userSchema.statics.updateTrainingCenter = function (data, logoData, userId) {
  var updateQuery = {
    $set: {
      name: data.name,
      isPublic: data.isPublic === 'true' ? true : false
    }
  };
  
  if (logoData.wasUpdated) {
    updateQuery.logo = logoData.fileName;
    updateQuery.hasLogo = true;
  }

  return this.findOneAndUpdate({
    '_id': ObjectId(userId)
  }, updateQuery, {new: true}).then(function (user) {
    return {
      name: user.name,
      logo: user.logo,
      type: user.type,
      hasLogo: user.hasLogo,
      isPublic: user.isPublic
    };
  });
}
userSchema.statics.getTrainingCentersList = function () {
   return this.find({type: 'trainingCenter', isPublic: true }).then(function(trainingCenters) {
    return trainingCenters.map(function (item) {
      publicData = {
        id: item._id,
        name: item.name,
        logo: item.logo,
        hasLogo: item.hasLogo
      };
      return publicData;
    });
   });
}
userSchema.statics.getTrainingCenterInfo = function (id) {
  return this.find({ 
    '_id': ObjectId(id),
    type: 'trainingCenter'
  }).limit(1).then(function ([user]) {
    return {
      name: user.name,
      logo: user.logo,
      hasLogo: user.hasLogo,
      isPublic: user.isPublic
    };
  });
}
var User = mongoose.model('User', userSchema);

module.exports = User;