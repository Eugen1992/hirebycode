const User = require('../../models/user.js');

module.exports = function derigesterTrainingCenterFromAll (id) {
  const sQuery = {
    trainingCenters: { $elemMatch: { $eq : id } }
  };
  const uQuery = {
    $pull: {
      trainingCenters: id
    }
  };

  return User.update(sQuery, uQuery, {multi: true});
}
