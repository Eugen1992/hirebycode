const User = require('../../models/user');

module.exports = function ({ onlyPublic }) {
  const sQuery = {
    deleted: false,
    type: 'trainingCenter'
  };
  if (onlyPublic) {
    sQuery.isPublic = true;
  }
  return User.find(sQuery).then(function(trainingCenters) {
    return trainingCenters.map(function (item) {
      publicData = {
        id: item._id,
        name: item.name,
        logo: item.logo,
        hasLogo: item.hasLogo
      };
      return item;
    });
   });
}