const User = require('../../models/user.js');
const UserServices = require('../../services/user');
const LocationService = require('../../services/location');

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
    console.log(req.body);
    User.updateTrainingCenter(req.body, logoInfo, req.userId).then(function (user) {
      res.send(user);
    }, function () {
      res.sendStatus(500);
    });
  },
  getDeveloperDetails: (req, res, next) => {
    let userDetails;
    UserServices.getDeveloperProfile({ userId: req.userId, withContacts: true })
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
      return UserServices.updateDeveloperProfile(req.userId, req.body);
    })
    .then((user) => {
      return UserServices.getDeveloperProfile({ userId: req.userId, withContacts: true });
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
      UserServices.updateDeveloperAvatar(req.userId, req.imageFileName)
      .then(function (avatarData) {
        res.send(avatarData);
      }, function (err) {
        console.log(err);
        res.status(500).send(err);
      });
    } else {
      res.send(400);
    }
  },
  updateDeveloperAccountStatus: (req, res, next) => {
    UserServices.updateAccountStatus(req.userId, req.body)
    .then((user) => {
      res.send(200);
    }, (err) => {
      res.status(500).send(err);
    });
  }
}

module.exports = UserController;