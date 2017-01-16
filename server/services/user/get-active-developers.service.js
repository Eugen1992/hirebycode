const User = require('../../models/user');

module.exports = function getActiveDevelopers () {
  return User.find({type: 'developer'}).then((developers) => {
    return developers;
  });
}