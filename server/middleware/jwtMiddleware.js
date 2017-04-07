const jwt = require('jwt-simple');

module.exports = { 
  createToken: (req, res, next) => {
    if (req.user) {
      const payload = {
        iss: req.hostname,
        userId: req.user.id
      };
      req.token = jwt.encode(payload, process.env.JWT_SECRET);
    }
    next();
  },
  decodeToken: (req, res, next) => {
    const token = req.headers.authorization;

    if (req.headers.authorization) {
      const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

      req.userId = decodedToken.userId;
    }
    next();
  }
}