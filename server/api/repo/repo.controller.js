const Repo = require('../../models/repo.js');

const RepoController = {
  get: (req, res, next) => {
    Repo.find({}).exec(function (error, importedRepos) {
      if (error) {
        res.sendStatus(500);
      } else {
        res.send(importedRepos);
      }
    });
  },
  getById: (req, res, next) => {
    Repo.findOne({ _id: req.params.id}, function (err, repo) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(JSON.stringify(repo));
      }
    });
  }
}

module.exports = RepoController;