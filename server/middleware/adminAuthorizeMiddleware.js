var jwt = require('jwt-simple');
var User = require('../models/user.js');
var ObjectId = require('mongodb').ObjectId;

module.exports = function (req, res, next) {
  if (req.userId) {
    User.findOne({_id: ObjectId(req.userId), type: 'admin'}).then(function (user) {
      if (user === null) {
        res.sendStatus(401);
      } else {
        next();
      }
    }, function () {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}


var User = require('./../models/user');

module.exports = function (req, res, next) {
  var token = req.headers.authorization;
  if (req.headers.authorization) {
    User.findOne({token: req.headers.authorization}, function (err, user) {
      if (err) {
        res.sendStatus(500);
      }
      req.userId = user._id;
      req.login = user.githubLogin;
      next();  
    });
  } else {
    res.sendStatus(401);
  }
}