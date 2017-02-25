const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

module.exports = function () {
  return new GitHubStrategy({
      clientID: '11ab72fc5d5b195ee720',
      clientSecret: '3ab8338e26b13934fdefb7b59aa70b549651dcff',
      callbackURL: 'http://www.hirebycode.me/api/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;
      
       User.findOne({ githubId: profile.id }, function(err, user) {
      // In case of any error return
        if (err) {
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');

          return done(null, {
            id: user._id,
            accessToken
          });
        } else {
          registerDeveloper(profile.id, profile.username).then((newUser) => {
            return done(null, newUser);
          });
        }
      });
  });
}

function registerDeveloper (githubId, githubUsername) {
  return User.createDeveloper({
    githubId: githubId,
    githubLogin: githubUsername
  });
}