var User = require('../models/user.js');
var passport = require('passport');
var jwtMiddleware = require('../middleware/jwtMiddleware.js');
var ObjectId = require('mongodb').ObjectId;

function controller (app) {
  app.put('/api/auth/training',
    passport.authenticate('local'),
    jwtMiddleware,
    function (req, res) {
      if (!req.user) {
        res.sendStatus(400);
      }
      User.findOneAndUpdate({_id: ObjectId(req.user._id)}, {$set: {token: req.token} }, {new: true}).then(function (user) {
        res.send({ token: user.token, user: user });
      }, function (error) {
        res.sendStatus(500);
      })
    });
}

module.exports.controller = controller;