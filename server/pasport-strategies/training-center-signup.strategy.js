const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

module.exports = function () {
  return new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    session: false
  },
  function(login, password, done) {
    User.findOne({ 'login': login }, function(err, user) {
      // In case of any error return
      if (err) {
        console.log('Error in SignUp: ' + err);
        return done(err);
      }
      // already exists
      if (user) {
        console.log('User already exists');
        return done(null, false);
      } else {
        const newUser = new User();
        // set the user's local credentials
        newUser.login = login;
        createHash(password, (err, bcryptedPassword) => {
          if (err) done(err);
          newUser.password = bcryptedPassword;
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: ' + err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        });
      }
    });
  });
};

const createHash = (password, cb) => {
  bcrypt.hash(password, 5, cb);
}