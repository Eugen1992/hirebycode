var User = require('../models/user.js');


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
}
module.exports.controller = controller;