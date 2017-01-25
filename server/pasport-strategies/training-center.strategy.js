const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

module.exports = function () {
  return new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password',
      session: false
    },
  function (username, password, done) {
    console.log(username);
    User.findOne({ login: username, password: password, type: 'trainingCenter' }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  });
}