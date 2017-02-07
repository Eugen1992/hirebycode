module.exports = {
  getActiveDevelopers: require('./get-active-developers.service'),
  registerRepo: require('./register-repo.service'),
  deregisterRepo: require('./deregister-repo.service'),
  updateDeveloperProfile: require('./update-developer-profile.service'),
  updateDeveloperAvatar: require('./update-developer-avatar.service'),
  updateAccountStatus: require('./update-account-status.service'),
  getDeveloperProfile: require('./get-developer-profile.service'),
  getDeveloperSkills: require('./get-developer-skills.service'),
  updateSkills: require('./update-skills.service'),
  updateTrainingCenters: require('./update-training-centers.service.js'),
}