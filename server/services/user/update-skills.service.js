const User = require('../../models/user');
const Repo = require('../../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports = function updateSkills (userId) {
  const sQuery = {_id: ObjectId(userId)};

  return User.findOne(sQuery)
  .populate('repos', 'skills')
  .then((user) => {
    return user.repos.reduce((skillsSum, repo) => {
      return new Set([...skillsSum, ...repo.skills]);
    }, []);
  })
  .then((skills) => {
    const uQuery = {
      $set: { skills: Array.from(skills) }
    };
  return User.findOneAndUpdate(sQuery, uQuery);
  });
}