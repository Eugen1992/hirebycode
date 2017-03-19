const captchaService = require('../services/google-captcha');

module.exports = function (req, res, done) {
  captchaService(req.params.captcha, req.connection.remoteAddress, done);
}
