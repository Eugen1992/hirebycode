const User = require('../../models/user');

module.exports = function ReplaceSkillsInDevelopers (skillsToRemove, skillToInsert) {
  const sQuery = {
    skills: { $in: skillsToRemove }
  };

  const uQuery = {
    $pullAll: { skills: skillsToRemove }, 
    $addToSet: { skills: skillToInsert }
  };
  
  User.update(sQuery, uQuery, { multi: true });
}