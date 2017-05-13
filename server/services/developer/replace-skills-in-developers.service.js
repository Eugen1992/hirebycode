const User = require('../../models/user');

module.exports = function ReplaceSkillsInDevelopers (skillsToRemove, skillToInsert) {
  const sQuery = {
    skills: { $in: skillsToRemove }
  };

  const uQueryFirst = {
    $addToSet: { skills: skillToInsert }
  };
  
  const uQuerySecond = {
    $pullAll: { skills: skillsToRemove }, 
  };

  User.update(sQuery, uQueryFirst, { multi: true }).then(() => {
    return User.update(sQuery, uQuerySecond, { multi: true });
  });
}