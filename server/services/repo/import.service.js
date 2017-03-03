const Repo = require('../../models/repo');
const ObjectId = require('mongodb').ObjectId;

module.exports = function importService (data, userId) {
  const repo = new Repo({
    name: data.name,
    providerId: data.providerId,
    contents_url: data.contents_url,
    developer: userId,
    description: data.description,
    plans: data.plans,
    skills: data.skills,
    createdAt: new Date().getTime(),
    contactInfo: data.contactInfo,
    trainingCenterClaim: data.trainingCenterClaim,
    hidden: false
  });


  return repo.save().then((repo) => {
    return Repo.findOne({ _id: ObjectId(repo._id)})
      .populate('skills')
      .populate('developer');;
  });
}