const TokenService = require('../services/token');
const UserService = require('../services/user');
const EMAIL_VERIFICATION_STATUSES = require('../models/constants/email-verification-status.constants');

module.exports = function (req, res, next) {
  const { userId } = TokenService.decode(req.params.token);
  UserService.setEmailVerificationStatus(userId, { status: EMAIL_VERIFICATION_STATUSES.VERIFIED })
    .then((user) => {
      req.emailVerificationResult = user.emailVerificationStatus;
      next();
    })
    .catch((user) => {
      req.emailVerificationResult = EMAIL_VERIFICATION_STATUSES.NON_VERIFIED;
      next();
    });
}