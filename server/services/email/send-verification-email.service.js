const Promise = require('bluebird');
const EMAIL_VERIFICATION_STATUSES = require('../../models/constants/email-verification-status.constants.js');

module.exports = (smtpTransport) => {
  const sendMail = Promise.promisify(smtpTransport.sendMail.bind(smtpTransport));
  return ({ email, token }) => {
    console.log(email);
    const mailOptions = {
      to : email,
      subject : 'HireByCode: Email verification',
      text : `Hi! Please complete your email verification by visiting this link: http://dev.hirebycode.me/verify-email/${token}`
    };
    return sendMail(mailOptions)
      .then(() => {
        return { status: EMAIL_VERIFICATION_STATUSES.SENT };
      })
      .catch((error) => {
        return { status: EMAIL_VERIFICATION_STATUSES.SENT_ERROR };
      });
  };
}