const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

module.exports = function () {
  return new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password',
      session: false
    }, 
    (username, password, done) => {
      User.findOne({ login: username, type: 'trainingCenter' }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      bcrypt.compare(password, user.password, (err, doesMatch) => {
        if (doesMatch) {
           return done(null, user);
        } else {
          console.log(doesMatch);
           return done(new Error('Wrong credentials'));
        }
       });
    });
  });
}