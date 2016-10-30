var express = require('express');
var passport = require('passport');
var jwt = require('jwt-simple');
var User = require('../models/user');

function controller(app) {
  //app.get('/api/auth/github', passport.authenticate('github'));

  app.get('/api/auth/github',
    passport.authenticate('github', {failureRedirect: '/'}),
    function (req, res) {
      var token;
      User.findOne({ githubId: req.user.id}, function (err, user) {
        if (err) {
          res.sendStatus(500);
        } else if (user === null) {
          var payload = {
            iss: req.hostname,
            sub: req.user.id
          }
          var token = jwt.encode(payload, 'secret');
          console.log(req.user.login);
          var newUser = new User({
            githubId: req.user.id,
            githubLogin: req.user.username,
            token: token
          });
          newUser.save(function(err) {
            if (err) {
              res.sendStatus(500);
            } else {      
              res.status(200).json({token: token});
            }
          });  
        } else {          
          token = user.token;
          res.status(200).json({token:token});
        }
      });
  });
}



module.exports.controller = controller;