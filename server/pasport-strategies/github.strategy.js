const GitHubStrategy = require('passport-github').Strategy;

module.exports = function () {
  return new GitHubStrategy({
      clientID: '11ab72fc5d5b195ee720',
      clientSecret: '3ab8338e26b13934fdefb7b59aa70b549651dcff',
      callbackURL: 'http://www.hirebycode.me/api/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;
    
      done(null, profile);
  });
}