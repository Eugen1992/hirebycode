const User = require('../../models/user');

module.exports = function ({ onlyPublic }) {
  const sQuery = {
    type: 'trainingCenter'
  };
  const projection = '_id name logo hasLogo';
  if (onlyPublic) {
    sQuery.isPublic = true;
  }
  return User.find(sQuery, projection);
}