const User = require('../../models/user.js');
var ObjectId = require('mongodb').ObjectId;

const AuthController = {
  github: (req, res, next) => {
    User.findOne({ githubId: req.user.id}, function (err, user) {
      if (err) {
        res.sendStatus(500);
      } else if (user === null) {
        var newUser = new User({
          githubId: req.user.id,
          githubLogin: req.user.username,
          token: req.token,
          type: 'developer'
        });
        newUser.save(function(err) {
          if (err) {
            res.sendStatus(500);
          } else {
            res.status(200).json({
              githubToken: req.user.accessToken,
              token: req.token,
              user: newUser
            });
          }
        });  
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
  local: (req, res, next) => {
    if (!req.user) {
      res.sendStatus(400);
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
  }
}

module.exports = AuthController;