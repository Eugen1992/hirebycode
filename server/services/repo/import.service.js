const Repo = require('../../models/repo');

module.exports = function importService (data, userId) {
  const repo = new Repo({
    name: data.name,
    providerId: data.providerId,
    contents_url: data.contents_url,
    developer: userId,
    description: data.description,
    plans: data.plans,
    languages: data.languages,
    createdAt: new Date().getTime(),
    contactInfo: data.contactInfo,
    trainingCenterRequired: data.trainingCenterRequired
  });

  return repo.save();
}