const User = require('../../models/user.js');
const ObjectId = require('mongodb').ObjectId;
const TrainingCenterServices = require('../../services/training-center');

const AuthController = {
  github: (req, res, next) => {
    User.findOne({ githubId: req.user.id}, function (err, user) {
      if (err) {
        res.sendStatus(500);
      } else if (user === null) {
        registerDeveloper(req, res);
      } else {
        token = user.token;
        res.status(200).json({
          githubToken: req.user.accessToken,
          token: token,
          user: user
        });
      }
    });
  },
  trainingCenter: (req, res, next) => {
    if (!req.user) {
      res.sendStatus(401);
    }
    User.findOneAndUpdate({_id: ObjectId(req.user._id)}, {$set: {token: req.token} }, {new: true})
      .then(function (user) {
        res.send({ token: user.token, user: {
            type: user.type,
            name: user.name,
            hasLogo: user.hasLogo,
            logo: user.logo,
            isPublic: user.isPublic
          }
        });
      }, function (error) {
        res.sendStatus(500);
      });
  },
  trainingCenterSignup: (req, res, next) => {
    TrainingCenterServices.completeCreatingTrainingCenter({
      name: req.body.name,
      id: req.user._id
    }).then((trainingCenter) => {
      res.send(trainingCenter);
    }, (err) => {
      res.send(err);
    });
  },
  admin: (req, res, next) => {
    if (!req.user) {
      res.sendStatus(401);
    }
    User.findOneAndUpdate({_id: ObjectId(req.user._id)}, {$set: {token: req.token} }, {new: true})
      .then(function (user) {
        res.send({ token: user.token, user: {
            type: user.type
          }
        });
      }, function (error) {
        res.sendStatus(500);
      });
  }
}

function registerDeveloper (req, res) {
  User.createDeveloper({
    githubId: req.user.id,
    githubLogin: req.user.username,
    token: req.token
  }).then(function (newUser) {
    res.status(200).json({
        githubToken: req.user.accessToken,
        token: req.token,
        user: newUser
      });
  }, function (err) {
    res.status(500).send(err);
  });
}

module.exports = AuthController;