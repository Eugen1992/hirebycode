const User = require('../../models/user.js');
const UserServices = require('../../services/user');

const UserController = {
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
  getDeveloperDetails: (req, res, next) => {
    User.getDeveloperFullProfile(req.userId).then(function (details) {
      res.send(details);
    }, function () {
      res.sendStatus(500);
    });
  },
  updateDeveloperDetails: (req, res, next) => {
    UserServices.updateDeveloperProfile(req.userId, req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },
  updateDeveloperAvatar: (req, res, next) => {
    if (req.avatarUpdated) {
      UserServices.updateDeveloperAvatar(req.userId, req.avatarFileName)
      .then(function (avatarData) {
        res.send(avatarData);
      }, function (err) {
        res.status(500).send(err);
      });
    } else {
      res.send(400);
    }
  },
  updateDeveloperAccountStatus: (req, res, next) => {
    UserServices.updateAccountStatus(req.userId, req.body)
    .then((user) => {
      res.send(user);
    }, (err) => {
      res.status(500).send(err);
    });
  }
}

module.exports = UserController;