const passport = require('passport');

const adminStrategy = require('../pasport-strategies/admin.strategy');
const trainingCenterStrategy = require('../pasport-strategies/training-center.strategy.js');
const githubStrategy = require('../pasport-strategies/github.strategy.js');
const trainingCenterSignupStrategy = require('../pasport-strategies/training-center-signup.strategy.js');
  
module.exports = function(server) {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(githubStrategy());
  passport.use('training-center', trainingCenterStrategy());
  passport.use('training-center-signup', trainingCenterSignupStrategy());
  passport.use('admin', adminStrategy());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
