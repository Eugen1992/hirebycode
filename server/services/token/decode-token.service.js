const jwt = require('jwt-simple');

module.exports =  (token) => {
  return jwt.decode(token, process.env.JWT_SECRET);
}
