const Skill = require('../../models/skill');
const Promise = require('bluebird');

module.exports = function (skills) {
  const skillsWithoutId = skills.filter((skill) => {
    return  !skill._id;
  });

  if (skillsWithoutId.length) {
    return Promise.all(skillsWithoutId.map((skillWithoutId) => {
      return Skill.findOne({ name: skillWithoutId.name }).then((skill) => {
        if (skill) {
          return skill;
        } else {
          return skillWithoutId;
        } 
      });
    }))
    .then((skillsWithoutId) => {
      const newSkills = skillsWithoutId.filter((skill) => {
        return  !skill._id;
      });
      const oldIds = [...skillsWithoutId, ...skills].reduce((ids, skill) => {
        return skill._id ? [...ids, skill._id] : ids;
      }, []);
      if (newSkills.length) {
        return Skill.collection.insert(newSkills).then((result) => {
          result.insertedIds.shift();
          return [...oldIds, ...result.insertedIds];
        });
      } else {
        return Promise.resolve(oldIds);
      }
    });
  } else {
    return Promise.resolve(oldIds);
  }
  
};