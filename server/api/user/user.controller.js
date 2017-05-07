const User = require('../../models/user.js');
const UserService = require('../../services/user');
const LocationService = require('../../services/location');
const EmailService = require('../../services/email');
const TokenService = require('../../services/token');

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
      wasUpdated: req.imageUpdated,
      fileName: req.imageUpdated ? req.imageFileName : null
    };
    User.updateTrainingCenter(req.body, logoInfo, req.userId).then(function (user) {
      res.send(user);
    }, function () {
      res.sendStatus(500);
    });
  },
  getDeveloperDetails: (req, res, next) => {
    let userDetails;
    UserService.getDeveloperProfile({ userId: req.userId, withContacts: true })
      .then(function (details) {
        userDetails = details;
      })
      .then(function () {
        return LocationService.getLocationData(userDetails.placeId);
      })
      .then(function (location) {
        if (location) {
          userDetails.city = location.city;
          userDetails.country = location.country;
        }
      })
      .then(function () {
        res.send(userDetails);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send(err);
      })
  },
  updateDeveloperDetails: (req, res, next) => {
    LocationService.addLocation({
      placeId: req.body.placeId,
      city: req.body.city,
      country: req.body.country
    }).then((location) => {
      return UserService.updateDeveloperProfile(req.userId, req.body);
    })
    .then((user) => {
      return UserService.getDeveloperProfile({ userId: req.userId, withContacts: true });
    })
    .then(function (details) {
      return LocationService.getLocationData(details.placeId).then((location) => {
        return Object.assign({}, location, details);
      });
    })
    .then((details) => {
      res.send(details);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
  },
  updateDeveloperAvatar: (req, res, next) => {
    if (req.imageUpdated) {
      UserService.updateDeveloperAvatar(req.userId, req.imageFileName)
      .then(function (avatarData) {
        res.send(avatarData);
      })
      .catch(function (error) {
        console.log(error);
        res.send(error);
      });
    } else {
      res.send(400);
    }
  },
  updateDeveloperAccountStatus: (req, res, next) => {
    UserService.updateAccountStatus(req.userId, req.body)
    .then((user) => {
      res.send(200);
    }, (err) => {
      res.status(500).send(err);
    });
  },
  updateTrainingCenterAccountStatus: (req, res, next) => {
    UserService.updateTrainingCenterAccountStatus(req.userId, req.body)
    .then((user) => {
      res.send(200);
    }, (err) => {
      res.status(500).send(err);
    });
  },
  startEmailVerification: (req, res, next) => {
    UserService.getById(req.userId)
      .then((user) => {
        const token = TokenService.generate(req.userId);
        return EmailService.sendVerificationEmail({ email: user.email, token });
      })
      .then(({ status }) => {
        return UserService.setEmailVerificationStatus(req.userId, { status });
      })
      .then((user) => {
        res.send({ emailVerificationStatus: user.emailVerificationStatus });
      })
      .catch((error) => {
        res.status(500);
      });
  }
}

module.exports = UserController;