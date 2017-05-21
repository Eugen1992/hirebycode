const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;
const mongooseDelete = require('mongoose-delete');
const getImageUrlService = require('../services/image').getImageUrl;

const userSchema = new Schema({
  name: String,
  firstName: String,
  lastName: String,
  placeId: { type: String, ref: 'Location' },
  position: String,
  desiredPosition: String,
  type: String,
  githubId: String,
  githubLogin: String,
  githubToken: String,
  token: String,
  email: String,
  website: String,
  description: String,
  hasLogo: Boolean,
  logo: { type: String, get: getImageUrlService },
  avatar: { type: String, get: getImageUrlService },
  isPublic: Boolean,
  repos: [{type: String, ref: 'Repo'}],
  trainingCenters: [{type: String, ref: 'User' }],
  profileReadyForPublic: Boolean,
  hidden: Boolean,
  login: String,
  password: String,
  englishLevel: { type: String, enum: ['Elementary', 'Pre-intermediate', 'Intermediate', 'Advanced', 'Native speaker'] },
  relocateReady: Boolean,
  skills: [ { type: String, ref: 'Skill' }],
  emailVerificationStatus: String,
}, {
  toObject: { getters: true }
});


userSchema.statics.createDeveloper = function (data) {
  var createQuery = Object.assign(
    { type: 'developer', repos: [], hidden: false, emailVerificationStatus: 'non-verified' },
    data);

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
        _id: developer._id
      }
    });
  });
}
userSchema.statics.getDeveloperPublicProfile = function (id) {
  return this.find({
    '_id': ObjectId(id),
    type: 'developer' 
  })
  .limit(1)
  .populate('skills')
  .populate('trainingCenters')
  .then(function ([user]) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      placeId: user.placeId,
      skills: user.skills
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

userSchema.statics.getContactsById = function (userId) {
  return this.find({ 
    '_id': ObjectId(userId)
  }).limit(1).then(function (user) {
    return user[0].email;
  });
}
userSchema.statics.getTrainingCenter = function (userId) {
  return this.findOne({ 
    '_id': ObjectId(userId)
  }).then(function (user) {
    return {
      name: user.name,
      logo: user.logo,
      type: user.type,
      website: user.website,
      description: user.description,
      hasLogo: user.hasLogo,
      isPublic: user.isPublic,
      _id: user._id,
    };
  });
}
userSchema.statics.updateTrainingCenter = function (data, logoData, userId) {
  console.log(data);
  var updateQuery = {
    $set: {
      name: data.name,
      website: data.website,
      description: data.description,
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

userSchema.statics.getTrainingCenterInfo = function (id) {
  return this.find({ 
    '_id': ObjectId(id),
    type: 'trainingCenter'
  }).limit(1).then(function ([user]) {
    return {
      name: user.name,
      logo: user.logo,
      website: user.website,
      description: user.description,
      hasLogo: user.hasLogo,
      isPublic: user.isPublic
    };
  });
}

var User = mongoose.model('User', userSchema);

module.exports = User;