var User = require('./../models/user');

module.exports = function (req, res, next) {
  var token = req.headers.authorization;
  if (req.headers.authorization) {
    User.findOne({token: req.headers.authorization}, function (err, user) {
      if (err) {
        res.sendStatus(500);
      }
      req.userId = user._id;
      req.login = user.githubLogin;
      next();  
    });
  } else {
    console.log('didnt find user');
    res.sendStatus(401);
  }
}