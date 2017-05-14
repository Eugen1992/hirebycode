const Repo = require('../../models/repo');
const RepoServices = require('../../services/repo');

const RepoController = {
  get: (req, res, next) => {
    RepoServices.getAllActive().then(function (importedRepos) {
      res.send(importedRepos);
    }, function (error) {
      res.sendStatus(500);
    });
  },
  getById: (req, res, next) => {
    RepoServices.getRepo(req.params.id).then(function (repo) {
      setTimeout(() => {
        res.send(JSON.stringify(repo));
      }, 3000);
    }, function (error) {
      res.sendStatus(500);
    });
  }
}

module.exports = RepoController;