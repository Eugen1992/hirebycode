const User = require('../../models/user.js');
const UserServices = require('../../services/user');
const Repo = require('../../models/repo.js');
const Promise = require('promise');

const DeveloperController = {
  getById: (req, res, next) => {
    Promise.all([
      User.getDeveloperPublicProfile(req.params.id),
      Repo.getDeveloperRepos(req.params.id)
    ]).then(function(results) {
      const result = {
        info: results[0],
        repos: results[1].filter((repo) => !repo.hidden )
      };
      res.send(result);
    }, function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  },
  getFullById: (req, res, next) => {
    Promise.all([
      User.getDeveloperFullProfile(req.params.id),
      Repo.getDeveloperRepos(req.params.id)
    ]).then(function(results) {
      const result = {
        info: results[0],
        repos: results[1]
      };
      res.send(result);
    }, function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  },
  getActive: (req, res, next) => {
    UserServices.getActiveDevelopers().then((developers) => {
      res.send(developers);
    }, (err) => {
      res.sendStatus(500);
    });
  },
  getAll: (req, res, next) => {
    User.getDevelopers(req.userId).then(function (developers) {
      res.send(developers);
    }, function () {
      res.sendStatus(500);
    });
  },
  getContacts: (req, res, next) => {
    User.getContactsById(req.params.id).then(function (contacts) {
      res.send(contacts);
    }, function () {
      res.sendStatus(500);
    });
  }
}

module.exports = DeveloperController;