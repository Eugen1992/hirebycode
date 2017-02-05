const Repo = require('../../models/repo');
const getUserReposImported = require('./get-user-repos-imported.service.js');

const Promise = require('promise');
const request = require('request');
const _ = require('underscore');

module.exports = function getUserRepos (userId, providerLogin) {
  var promise = new Promise(function (resolveListFormed, rejectListFormed) {
    var dbPromise = getReposFromDb(userId);
    var githubReposPromise = getReposFromGithub(providerLogin);
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
    })
    .catch((err) => {
      console.log(err);
    });
    
  }).catch((err) => {
      console.log(err);
    });;
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
  return getUserReposImported(userId);
}