var Repo = require('../models/repo');
var Promise = require('promise');
var request = require('request');
var _ = require('underscore');

function controller(app) {
  app.get("/api/repos/user", function(clientRequest, clientResponse) { 
    var login =  clientRequest.session.login;
    
    if (login) {
      formReposList(login).then(function (data) {
        clientResponse.sendStatus(JSON.stringify(data));
      });
    } else {
      clientResponse.sendStatus(500);
    }
    
  });
  app.delete("/api/repos/:id", function(req, res) {
    Repo.find({ _id: req.params.id}).remove(function (err) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  });

  app.post("/api/repos", function(req, res) {
    var login = req.session.login;
    var newRepo;
    
    if (login) {
      newRepo = new Repo({
        name: req.body.name,
        developer: req.session.login
      });

      newRepo.save(function(err) {
        if (err) {
          res.sendStatus(500);
        } else {      
          res.status(200).json(newRepo);
        }
      });  
    } else {
      res.sendStatus(500);
    }
    
  });
}

function formReposList (userName) {
  var promise = new Promise(function (resolveListFormed, rejectListFormed) {
    var dbPromise = getReposFromDb(userName);
    var githubReposPromise = getReposFromGithub(userName);
    var importedRepos;
    Promise.all([dbPromise, githubReposPromise]).then(function (responses) {
      var importedRepos = responses[0];
      var reposFromGithub = responses[1];
      
      importedRepos.forEach(function (importedRepo) {
        importedRepo = importedRepo.toObject();
        var githubRepo = _.find(reposFromGithub, function (repo) {
          return repo.name === importedRepo.name;
        });
        if (githubRepo) {
          githubRepo.imported = true;  
          Object.assign(githubRepo, importedRepo);
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
      url: 'https://api.github.com/users/' + userName + '/repos',
      headers: {
        'User-Agent': 'HireByCode'
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
function getReposFromDb (userName) {
  var promise = new Promise(function (resolve, reject) {
    Repo.find({developer: userName}).exec(function (error, importedRepos) {
      if (error) {
        reject();
      } else {
        resolve(importedRepos);  
      }
    });
  });
  return promise;
}
module.exports.controller = controller;