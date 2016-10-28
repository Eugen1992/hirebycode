var express = require('express');
var passport = require('passport');

function controller(app) {
  //app.get('/api/auth/github', passport.authenticate('github'));

  app.get('/api/auth/github',
    passport.authenticate('github', {failureRedirect: '/'}),
    function (req, res) {
      console.log(req.user);
      //clientRequest.session.email = userData.email;
      //clientRequest.session.login = userData.login;
      res.sendStatus(200);
  });
}

module.exports.controller = controller;