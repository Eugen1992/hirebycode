const Repo = require('../../models/repo.js');

const RepoController = {
  get: (req, res, next) => {
    Repo.getAll().then(function (importedRepos) {
      res.send(importedRepos);
    }, function (error) {
      console.log(error);
      res.sendStatus(500);
    });
  },
  getById: (req, res, next) => {
    Repo.getOne(req.params.id).then(function (repo) {
      res.send(JSON.stringify(repo));
    }, function (error) {
      console.log(error);
      res.sendStatus(500);
    });
  }
}

module.exports = RepoController;