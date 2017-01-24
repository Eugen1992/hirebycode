const Skill = require('../../models/skill.js');

const SkillsController = {
  get: (req, res) => {
    Skill.find({}).then((skills) => {
      res.send(skills);
    });
  },
  create: (req, res) => {
    const newSkill = new Skill({ name: req.body.name });

    newSkill.save().then((skill) => {
      res.send(skill);
    }, (err) => {
      res.status(500).send(err);
    });
  },
  remove: (req, res) => {
    Skill.remove({ _id: req.body.id }).then(function () {
      res.sendStatus(200);
    }, function (err) {
      res.status(500).send(err);
    });
  }
}

module.exports = SkillsController;