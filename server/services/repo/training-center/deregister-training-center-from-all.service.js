const Repo = require('../../../models/repo.js');
const trainingCenterStatus = require('../../../models/constants/training-center-status.constants');

module.exports = function derigesterTrainingCenterFromAll (id) {
  const sQuery = {
    trainingCenterApproved: id
  };
  const uQuery = {
    $unset: {
      trainingCenter: null,
      trainingCenterStatus: trainingCenterStatus.NONE,
    }
  };

  return Repo.update(sQuery, uQuery, {multi: true});
}
