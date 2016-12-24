var jwt = require('jwt-simple');
var User = require('../models/user.js');
var ObjectId = require('mongodb').ObjectId;

module.exports = function (req, res, next) {
  if (req.userId) {
    User.findOne({_id: ObjectId(req.userId), type: 'trainingCenter'}).then(function () {
      next();
    }, function () {
      console.log('did not found');
      res.sendStatus(401);
    });
  } else {
    console.log('didnt pass user');
    res.sendStatus(401);
  }
}