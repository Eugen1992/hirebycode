const User = require('../../models/user.js');
const TrainingCenterServices = require('../../services/training-center');

const TrainingCenterController = {
  getTrainingCentersFullList: (req, res, next) => {
    TrainingCenterServices.getTrainingCentersList({ onlyPublic: false }).then(function (centers) {
      res.send(centers);
    }, function () {
      res.sendStatus(500);
    });
  },
  getTrainingCentersList: (req, res, next) => {
    TrainingCenterServices.getTrainingCentersList({ onlyPublic: true }).then(function (centers) {
      res.send(centers);
    }, function () {
      res.sendStatus(500);
    });
  }
}

module.exports = TrainingCenterController;