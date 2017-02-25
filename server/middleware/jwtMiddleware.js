const jwt = require('jwt-simple');

module.exports = { 
  createToken: (req, res, next) => {
    console.log(req.user);
    if (req.user) {
      const payload = {
        iss: req.hostname,
        userId: req.user.id
      };
      req.token = jwt.encode(payload, 'secret');
    }
    next();
  },
  decodeToken: (req, res, next) => {
    const token = req.headers.authorization;

    if (req.headers.authorization) {
      const decodedToken = jwt.decode(token, 'secret');

      req.userId = decodedToken.userId;
    }
    next();
  }
}