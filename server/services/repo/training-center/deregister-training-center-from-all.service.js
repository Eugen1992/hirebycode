const Repo = require('../../../models/repo.js');

module.exports = function derigesterTrainingCenterFromAll (id) {
  const sQuery = {
    trainingCenterApproved: id
  };
  const uQuery = {
    $unset: {
      trainingCenterApproved: null
    }
  };

  return Repo.update(sQuery, uQuery, {multi: true});
}
