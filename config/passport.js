var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

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

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
