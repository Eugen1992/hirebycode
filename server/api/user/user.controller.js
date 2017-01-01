const User = require('../../models/user.js');

const UserController = {
  getContactsById: (req, res, next) => {
    User.getContactsById(req.params.userId).then(function (contacts) {
      res.send(contacts);
    }, function () {
      res.sendStatus(500);
    });
  },
  getTrainingCentersList: (req, res, next) => {
    console.log('getting centers list');
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
  getDeveloperDetails: (req, res, next) => {
    User.getContacts(req.login).then(function (details) {
      console.log(details);
      res.send(details);
    }, function () {
      res.sendStatus(500);
    });
  },
  updateDeveloperDetails: (req, res, next) => {
    User.updateContacts(req.body.contacts, req.login).then(function () {
      res.sendStatus(200);
    }, function () {
      res.sendStatus(500);
    });
  }
}

module.exports = UserController;