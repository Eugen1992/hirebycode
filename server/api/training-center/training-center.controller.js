const User = require('../../models/user.js');
const TrainingCenterServices = require('../../services/training-center');
const ObjectId = require('mongodb').ObjectId;

const TrainingCenterController = {
  getTrainingCentersFullList: (req, res, next) => {
    TrainingCenterServices.getTrainingCentersList({ onlyPublic: false }).then(function (centers) {
      res.send(centers);
    }, function () {
      res.sendStatus(500);
    });
  },
  removeTrainingCenter: (req, res, next) => {
    TrainingCenterServices.removeTrainingCenter(req.params.id).then(function () {
      res.sendStatus(200);
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
  },
  getFullTrainingCenterById: (req, res, next) => {
    User.findOne({ _id: ObjectId(req.params.id) }).then(function (center) {
      if (center === null) {
        res.status(404).send('No such training center')
      }
      res.send(center);
    }, function () {
      res.sendStatus(500);
    });
  }
}

module.exports = TrainingCenterController;