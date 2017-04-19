const Skill = require('../../models/skill.js');
const RepoService = require('../../services/repo');
const DeveloperService = require('../../services/developer');
const Promise = require('bluebird');

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
  merge: (req, res) => {
    const { skillToMergeTo, skillsToMerge } = req.body;
    const skillsToMergeIds = skillsToMerge.map((skill) => {
      return skill._id;
    });

    Promise.all(skillsToMerge.map((skill) => {
      return Skill.remove({ _id: skill._id });
    }))
    .then(() => {
      return RepoService.replaceSkillsInRepos(skillsToMergeIds, skillToMergeTo._id);
    })
    .then(() => {
      return DeveloperService.replaceSkillsInDevelopers(skillsToMergeIds, skillToMergeTo._id);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  },
  remove: (req, res) => {
    Skill.remove({ _id: req.params.id }).then(function () {
      res.sendStatus(200);
    }, function (err) {
      res.status(500).send(err);
    });
  }
}

module.exports = SkillsController;