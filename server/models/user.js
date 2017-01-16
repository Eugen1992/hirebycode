var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectId;

var userSchema = new Schema({
  name: String,
  firstName: String,
  lastName: String,
  location: Object,
  type: String,
  githubId: String,
  githubLogin: String,
  githubToken: String,
  token: String,
  contacts: String,
  hasLogo: Boolean,
  logo: String,
  avatar: String,
  isPublic: Boolean,
  repos: Array
});

userSchema.statics.createDeveloper = function (data) {
  var createQuery = Object.assign(
    data,
    { type: 'developer', avatar: 'placeholder.png', repos: [] });

  return this.create(createQuery);
}
userSchema.statics.getDevelopers = function (id) {
  return this.find({type: 'developer'}).then(function(developers) {
    return developers.map(function (developer) {
      return {
        firstName: developer.firstName,
        lastName: developer.lastName,
        location: developer.location,
        avatar: developer.avatar,
        id: developer._id
      }
    });
  });
}
userSchema.statics.getDeveloperPublicProfile = function (id) {
  return this.find({ 
    '_id': ObjectId(id),
    type: 'developer' 
  }).limit(1).then(function ([user]) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      location: user.location
    };
  });
}
userSchema.statics.getDeveloperFullProfile = function (id) {
  return this.find({
    '_id': ObjectId(id)
  }).limit(1).then(function([user]) {
    return user;
  });
}
userSchema.statics.updateContacts = function (params, avatarInfo, id) {
  var updateQuery = {
    $set: {
      contacts: params.contacts,
      firstName: params.firstName,
      lastName: params.lastName,
      location: params.location
    }
  };
  
  if (avatarInfo.wasUpdated) {
    updateQuery.avatar = avatarInfo.fileName;
  }

  return this.findOneAndUpdate({
    '_id': ObjectId(id)
  }, updateQuery, {new: true}).then(function (user) {
    return {
      contacts: user.contacts,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      location: user.location
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