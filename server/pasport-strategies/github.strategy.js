const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

module.exports = function () {
  return new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
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
            isNewUser: false,
            id: user._id,
            accessToken
          });
        } else {
          registerDeveloper(profile.id, profile.username).then((newUser) => {
            return done(null, Object.assign(newUser.toObject(), { isNewUser: true }));
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