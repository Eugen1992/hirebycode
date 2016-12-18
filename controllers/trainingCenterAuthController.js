var User = require('../models/user.js');
var passport = require('passport');
var jwtMiddleware = require('../middleware/jwtMiddleware.js');

function controller (app) {
  app.put('/api/auth/training',
    passport.authenticate('local'),
    jwtMiddleware,
    function (req, res) {
      if (!req.user) {
        res.sendStatus(400);
      }
      res.send({ token: req.token, user: req.user });
    });
}

module.exports.controller = controller;