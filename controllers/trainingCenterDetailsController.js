var User = require('../models/user.js');


function controller(app) {
  app.put('/api/training-center/details', function(request, response) {
    User.updateTrainingCenter(request.body, request.userId).then(function () {
      response.sendStatus(200);
    }, function () {
      response.sendStatus(500);
    });
  });
}
module.exports.controller = controller;