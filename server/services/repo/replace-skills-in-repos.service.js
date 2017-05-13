const Repo = require('../../models/repo');

module.exports = function ReplaceSkillsInRepos (skillsToRemove, skillToInsert) {
  const sQuery = {
    skills: { $in: skillsToRemove }
  };

  const uQueryFirst = {
    $addToSet: { skills: skillToInsert }
  };
  
  const uQuerySecond = {
    $pullAll: { skills: skillsToRemove }, 
  };

  Repo.update(sQuery, uQueryFirst, { multi: true }).then(() => {
    return Repo.update(sQuery, uQuerySecond, { multi: true });
  });
}