const User = require('../../models/user.js');
const UserServices = require('../../services/user');

const UserController = {
  getTrainingCentersList: (req, res, next) => {
    User.getTrainingCentersList().then(function (centers) {
      res.send(centers);
    }, function () {
      res.sendStatus(500);
    });
  },
  getTrainingCenterDetails: (req, res, next) => {
    User.getTrainingCenter(req.userId).then(function (details) {
      res.send(details);
    }, function () {
      res.sendStatus(500);
    });
  },
  updateTrainingCenterDetails: (req, res, next) => {
    var logoInfo = {
      wasUpdated: req.logoUpdated,
      fileName: req.logoUpdated ? req.logoFileName : null
    }

    User.updateTrainingCenter(req.body, logoInfo, req.userId).then(function (user) {
      res.send(user);
    }, function () {
      res.sendStatus(500);
    });
  },
  getDeveloperFullProfile: (req, res, next) => {
    User.getDeveloperFullProfile(req.userId).then(function (details) {
      res.send(details);
    }, function () {
      res.sendStatus(500);
    });
  },
  updateDeveloperDetails: (req, res, next) => {
    UserServices.updateProfile(req.userId, req.body)
    .then((user) => {
      if (req.avatarUpdated) {
        return UserServices.updateAvatar(req.userId, req.avatarFileName);
      } else {
        return user;
      }
    })
    .then((user) => {
      res.send(user);
    }, (err) => {
      res.status(500).send(err);
    });
  }
}

module.exports = UserController;