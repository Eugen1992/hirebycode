const Repo = require('../../models/repo');

module.exports = function ReplaceSkillsInRepos (skillsToRemove, skillToInsert) {
  const sQuery = {
    skills: { $in: skillsToRemove }
  };

  const uQuery = {
    $pullAll: { skills: skillsToRemove }, 
    $addToSet: { skills: skillToInsert }
  };
  
  Repo.update(sQuery, uQuery, { multi: true });
}