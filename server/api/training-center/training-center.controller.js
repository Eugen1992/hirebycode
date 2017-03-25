const User = require('../../models/user.js');
const TrainingCenterServices = require('../../services/training-center');
const RepoServices = require('../../services/repo');
const DeveloperServices = require('../../services/developer');
const ObjectId = require('mongodb').ObjectId;
const Repo = require('../../models/repo.js');

const TrainingCenterController = {
  getTrainingCentersFullList: (req, res, next) => {
    TrainingCenterServices.getTrainingCentersList({ onlyPublic: false }).then(function (centers) {
      res.send(centers);
    }, function () {
      res.sendStatus(500);
    });
  },
  removeTrainingCenter: (req, res, next) => {
    TrainingCenterServices.removeTrainingCenter(req.params.id)
      .then(() => {
        return RepoServices.TrainingCenter.deregisterTrainingCenterFromAll(req.params.id);
      })
      .then(function () {
        return DeveloperServices.deregisterTrainingCenterFromAll(req.params.id);
      })
      .then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        console.log(err);
        res.send(err);
      });
  },
  getTrainingCenter: (req, res, next) => {
    TrainingCenterServices.getTrainingCenter(req.params.id)
      .then((trainingCenter) => {
        res.send(trainingCenter);
      }, (err) => {
        console.log(err);
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
  },
  getFullTrainingCenterRepos: (req, res, next) => {
    Repo.getTrainingCenterRepos(req.params.id).then((repos) => {
      res.send(repos);
    }, function () {
      res.sendStatus(500);
    });
  }
}

module.exports = TrainingCenterController;