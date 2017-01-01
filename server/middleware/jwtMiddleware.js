var jwt = require('jwt-simple');

module.exports = function (req, res, next) {
  if (req.user) {
    var payload = {
      iss: req.hostname,
      sub: req.user.id
    };
    req.token = jwt.encode(payload, 'secret');
  }
  next();
}