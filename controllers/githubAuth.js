var express = require('express');
var passport = require('passport');

function controller(app) {
  app.get('/api/auth/github', passport.authenticate('github'));

  app.get('/api/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    function (req, res) {
      
      res.redirect('/#/account');
  });
}

module.exports.controller = controller;