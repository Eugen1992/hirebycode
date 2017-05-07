const jwt = require('jwt-simple');

module.exports = function (userId, email) {
  const payload = {
    userId
  };
  return jwt.encode(payload, process.env.JWT_SECRET);
}
