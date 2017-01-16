const User = require('../../models/user.js');

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
    var avatarInfo = {
      wasUpdated: req.avatarUpdated,
      fileName: req.avatarUpdated ? req.avatarFileName : null
    }

    User.updateContacts(req.body, avatarInfo, req.userId).then(function (user) {
      res.send(user);
    }, function () {
      res.sendStatus(500);
    });
  }
}

module.exports = UserController;