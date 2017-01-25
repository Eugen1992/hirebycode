const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

module.exports = function () {
  return new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password',
      session: false
    }, (username, password, done) => {
      User.findOne({ login: username, password: password, type: 'admin' }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
  });
}
