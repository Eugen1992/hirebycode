const User = require('../../models/user');

module.exports = function getActiveDevelopers () {
  return User.find({type: 'developer', 'repos.0': {$exists: true} }).then((developers) => {
    return developers;
  });
}