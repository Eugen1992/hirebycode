const request = require('request');

module.exports = function (captcha, ipAddress, done) {
  const secretKey = process.env.ENV === 'production'?
    process.env.GOOGLE_CAPTCHA_KEY :
    '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

  const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
  const verificationParams = `?secret=${secretKey}&response=${captcha}&remoteip=${ipAddress}`;
  const requestUrl = verificationUrl + verificationParams;

   request(requestUrl, function(error, response, body) {
    try {
      body = JSON.parse(body);
    } catch(error) {
      done(error);
    }
    
    if (body.success !== undefined && !body.success) {
      done("Failed captcha verification");
    }
    done();
  });
}