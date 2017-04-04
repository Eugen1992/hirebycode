const Repo = require('../../models/repo');
const ObjectId = require('mongodb').ObjectId;
const trainingCenterStatus = require('../../models/constants/training-center-status.constants');

module.exports = function importService (data, userId) {
  const repo = new Repo({
    name: data.name,
    providerId: data.providerId,
    type: data.type,
    contents_url: data.contents_url,
    developer: userId,
    description: data.description,
    link: data.link,
    plans: data.plans,
    skills: data.skills,
    createdAt: new Date().getTime(),
    contactInfo: data.contactInfo,
    trainingCenter: data.trainingCenter,
    trainingCenterStatus: data.trainingCenter 
      ? trainingCenterStatus.PENDING 
      : trainingCenterStatus.NONE,
    trainingCenterMessage: data.trainingCenter
      ? trainingCenterStatus.PENDING_MESSAGE
      : null,
    hidden: false
  });


  return repo.save().then((repo) => {
    return Repo.findOne({ _id: ObjectId(repo._id)})
      .populate('skills')
      .populate('trainingCenter')
      .populate('developer')
      .then((repo) => {
        repo.trainingCenter = repo.trainingCenter.toObject();

        return repo;
      });
  });
}