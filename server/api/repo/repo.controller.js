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
      res.send(JSON.stringify(repo));
    }, function (error) {
      console.log(error);
      res.sendStatus(500);
    });
  }
}

module.exports = RepoController;