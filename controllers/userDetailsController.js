var User = require('../models/user.js');


function controller(app) {
  app.get('/api/user/details', function(request, response) {
    User.getContacts(request.login).then(function (details) {
      response.send(details);
    }, function () {
      res.sendStatus(500);
    })
  });
  app.put('/api/user/details', function(request, response) {
    User.updateContacts(request.body.contacts, request.login).then(function () {
      response.sendStatus(200);
    }, function () {
      response.sendStatus(500);
    });
  });
}
module.exports.controller = controller;