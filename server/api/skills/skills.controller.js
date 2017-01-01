var skills = require('./skills.json');

const SkillsController = {
  get: (req, res, next) => {
    res.send(skills);
  }
}

module.exports = SkillsController;