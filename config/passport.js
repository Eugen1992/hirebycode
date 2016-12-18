var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

module.exports = function(server) {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(new GitHubStrategy({
      clientID: '11ab72fc5d5b195ee720',
      clientSecret: '3ab8338e26b13934fdefb7b59aa70b549651dcff',
      callbackURL: 'http://www.hirebycode.me/api/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;
    
      done(null, profile);
  }));

  passport.use(new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password',
      session: false
    },
    function (username, password, done) {
      User.findOne({ login: username, password: password }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
