const User = require('../../models/user.js');
const UserServices = require('../../services/user');
const LocationServices = require('../../services/user');
const RepoServices = require('../../services/repo');
const Repo = require('../../models/repo.js');
const Promise = require('promise');
const LocationService = require('../../services/location');

const DeveloperController = {
  getById: (req, res, next) => {
    let result;

    Promise.all([
      User.getDeveloperPublicProfile(req.params.id),
      RepoServices.getUserReposImported(req.params.id)
    ])
    .then(function(results) {
      result = {
        info: results[0],
        repos: results[1].filter((repo) => !repo.hidden)
      };
      return result;
    })
    .then((result) => {
      return LocationService.getLocationData(result.info.placeId);
    })
    .then((location) => {
      if (location) {
        result.info.city = location.city;
        result.info.country = location.country;
      }
    })
    .then(() => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  },
  getFullById: (req, res, next) => {
    Promise.all([
      User.getDeveloperFullProfile(req.params.id),
      RepoServices.getUserReposImported(req.params.id)
    ]).then(function(results) {
      const result = {
        info: results[0],
        repos: results[1]
      };
      res.send(result);
    }, function (err) {
      res.sendStatus(500);
    });
  },
  getActive: (req, res, next) => {
    const skillFilter = req.query.skill ? req.query.skill.split(',') : null;
    const filters = {
      skill: skillFilter,
      school: req.query.school,
      location: req.query.location,
    };
    UserServices.getActiveDevelopers(filters)
    .then((developers) => {
      res.send(developers);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  },
  getAll: (req, res, next) => {
    User.getDevelopers()
    .then(function (developers) {
      res.send(developers);
    })
    .catch(function () {
      res.sendStatus(500);
    });
  },
  getContacts: (req, res, next) => {
    User.getContactsById(req.params.id).then(function (contacts) {
      res.send(contacts);
    }, function () {
      res.sendStatus(500);
    });
  }
}

module.exports = DeveloperController;