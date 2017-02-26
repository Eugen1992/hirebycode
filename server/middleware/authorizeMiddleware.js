const User = require('../models/user.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = ({ userType }) => (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const sQuery = {
      _id: ObjectId(req.userId),
      type: userType,
      token
    };

    User.findOne(sQuery, (err, user) => {
      if (err) {
        res.sendStatus(500);
      }
      else if (user === null) {
        res.sendStatus(401);
      } else {
        req.userId = user._id;
        req.login = user.githubLogin;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
}