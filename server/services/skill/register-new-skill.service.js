const Skill = require('../../models/skill');
const Promise = require('bluebird');

module.exports = function (skills) {
  const newSkills = skills.filter((skill) => {
    return  !skill._id;
  });

  const oldIds = skills.reduce((ids, skill) => {
    return skill._id ? [...ids, skill._id] : ids;
  }, []);
  if (newSkills.length) {
    return Skill.collection.insert(newSkills).then((result) => {
      result.insertedIds.shift()
      return [...oldIds, ...result.insertedIds];
    });
  } else {
    return Promise.resolve(oldIds);
  }
  
};