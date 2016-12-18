var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var jwtMiddleware = require('../middleware/jwtMiddleware.js');

function controller(app) {
  app.get('/api/auth/github',
    passport.authenticate('github', {failureRedirect: '/'}),
    jwtMiddleware,
    function (req, res) {
      User.findOne({ githubId: req.user.id}, function (err, user) {
        if (err) {
          res.sendStatus(500);
        } else if (user === null) {
          var newUser = new User({
            githubId: req.user.id,
            githubLogin: req.user.username,
            token: req.token
          });
          newUser.save(function(err) {
            if (err) {
              res.sendStatus(500);
            } else {
              res.status(200).json({
                githubToken: req.user.accessToken,
                token: req.token
              });
            }
          });  
        } else {
          token = user.token;
          res.status(200).json({
            githubToken: req.user.accessToken,
            token: token
          });
        }
      });
  });
}

module.exports.controller = controller;