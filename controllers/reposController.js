var Repo = require('../models/repo');
var User = require('../models/user');
var Promise = require('promise');
var request = require('request');
var _ = require('underscore');

function controller(app) {
  app.get("/api/repos/", function(req, res) {
    Repo.find({}).exec(function (error, importedRepos) {
      if (error) {
        res.sendStatus(500);
      } else {
        res.send(importedRepos);
      }
    });
  });
  app.get("/api/repos/contacts/:userId", function (req, res) {
    User.getContactsById(req.params.userId).then(function (contacts) {
      res.send(contacts);
    }, function () {
      res.sendStatus(500);
    });
  });
  app.get("/api/repos/:id", function(req, res) {
    Repo.findOne({ _id: req.params.id}, function (err, repo) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(JSON.stringify(repo));
      }
    });
  });
}
module.exports.controller = controller;