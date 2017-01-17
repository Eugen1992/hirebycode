const Repo = require('../../../models/repo');
const RepoServices = require('../../../services/repo');
const UserServices = require('../../../services/user');

const Promise = require('promise');
const request = require('request');
const _ = require('underscore');

const RepoDeveloperController = {
  get: (req, res, next) => {
    var userId =  req.userId;
    var providerLogin = req.login;
    if (userId) {
      formReposList(userId, providerLogin).then(function (data) {
        res.send(JSON.stringify(data));
      });
    } else {
      res.sendStatus(500);
    }
  },
  deleteById: (req, res, next) => {
    Repo.find({ _id: req.params.id}).remove()
    .then(() => {
      return UserServices.deregisterRepo(req.userId, req.params.id);
    })
    .then(() => {
      res.send(200);
    }, (err) => {
      res.status(500).send(err);
    });
  },
  import: (req, res, next) => {
    let repo;

    RepoServices.import(req.body, req.userId)
    .then((importedRepo) => {
      repo = importedRepo;
      return repo;
    }).then((repo) => {
      return UserServices.registerRepo(req.userId, repo._id)
    })
    .then(() => {
      res.send(repo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },
  updateImported: (req, res, next) => {
    var login = req.login;
    var repo;
    
    if (login) {
      Repo.update({_id: req.params.id}, req.body, 
        function(err, numberAffected, rawResponse) {
         if (err) {
          res.sendStatus(500);
         } else {
          res.sendStatus(200);
         }
      });
    } else {
      res.sendStatus(500);
    }
  },
  hideById: (req, res, next) => {
    RepoServices.hide(req.params.id)
    .then(() => UserServices.deregisterRepo(req.userId, req.params.id))
    .then(() => {
      res.send(200);
    }, (err) => {
      res.status(500).send(err);
    });
  },

  unhideById: (req, res, next) => {
    RepoServices.unhide(req.params.id)
    .then(() => UserServices.registerRepo(req.userId, req.params.id))
    .then(() => {
      res.send(200);
    }, (err) => {
      res.sendStatus(500);
    });
  },
}

module.exports = RepoDeveloperController;

function formReposList (userId, providerLogin, githubToken) {
  var promise = new Promise(function (resolveListFormed, rejectListFormed) {
    var dbPromise = getReposFromDb(userId);
    var githubReposPromise = getReposFromGithub(providerLogin, githubToken);
    var importedRepos;
    Promise.all([dbPromise, githubReposPromise]).then(function (responses) {
      var importedRepos = responses[0];
      var reposFromGithub = responses[1];
      
      importedRepos.forEach(function (importedRepo) {
        importedRepo = importedRepo.toObject();
        var githubRepo = _.find(reposFromGithub, function (repo) {
          return repo.id === importedRepo.providerId;
        });
        if (githubRepo) {
          githubRepo.imported = true;
          githubRepo.hbcId = importedRepo._id;
          githubRepo.hbcData = importedRepo;
        }
      });
      resolveListFormed(reposFromGithub);
    });
    
  });
  return promise;
}
function getReposFromGithub (userName) {
  var githubReposPromise = new Promise(function (resolve, reject) {
    var options = {
      url: 'https://api.github.com/users/' + userName + '/repos' + '?client_id=11ab72fc5d5b195ee720&client_secret=3ab8338e26b13934fdefb7b59aa70b549651dcff',
      headers: {
        'User-Agent': 'HireByCode',
      }
    };
    request.get(options, function (error, response) {
      if (error) {
        reject();
      } else {
        var repos = JSON.parse(response.body);
        resolve(repos);
      }
    });
  });
  return githubReposPromise;
}
function getReposFromDb (userId) {
  return Repo.getDeveloperRepos(userId);
}