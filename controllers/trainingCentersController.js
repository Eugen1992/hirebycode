var User = require('../models/user.js');
var Repo = require('../models/repo.js');

function controller(app) {
  app.put('/api/training-center/details', function(request, response) {
    var logoInfo = {
      wasUpdated: request.logoUpdated,
      fileName: request.logoUpdated ? request.logoFileName : null
    }
    User.updateTrainingCenter(request.body, logoInfo, request.userId).then(function (user) {
      response.send(user);
    }, function () {
      response.sendStatus(500);
    });
  });
  app.get('/api/training-center', function(request, response) {
    User.getTrainingCentersList().then(function (trainingCenters) {
      response.send(trainingCenters);
    }, function (err) {
      response.sendStatus(500);
    });
  });
  app.get('/api/training-center/repos', function(request, response) {
    Repo.getTrainingCenterRequests(request.userId).then(function (centerRequests) {
      response.send(centerRequests);
    }, function (err) {
      response.sendStatus(500);
    });
  });
  app.put('/api/training-center/repos', function(request, response) {
    if (request.body.approved) {
      Repo.approveTrainingCenterStatus({
        repoId: request.body.repoId,
        trainingCenterId: request.userId,
        approved: true
      }).then(function (repo) {
        response.send(repo);
      }, function (err) {
        response.sendStatus(500);
      });
    } else {
      Repo.disapproveTrainingCenterStatus({
        repoId: request.body.repoId,
        trainingCenterId: request.userId,
        approved: false
      }).then(function (repo) {
        response.send(repo);
      }, function (err) {
        response.sendStatus(500);
      });
    }
  });
}
module.exports.controller = controller;