const Promise = require('bluebird');
const EMAIL_VERIFICATION_STATUSES = require('../../models/constants/email-verification-status.constants.js');
const rootUrl = require('../../config/root-url.js');

module.exports = (smtpTransport) => {
  const sendMail = Promise.promisify(smtpTransport.sendMail.bind(smtpTransport));
  return ({ email, token }) => {
    const mailOptions = {
      to : email,
      subject : 'HireByCode: Email verification',
      template: 'email-verification',
      context: {
        token,
        rootUrl,
      },
      text : `Hi! Please complete your email verification by visiting this link: ${rootUrl}/verify-email/${token}`
    };
    return sendMail(mailOptions)
      .then(() => {
        return { status: EMAIL_VERIFICATION_STATUSES.SENT };
      })
      .catch((error) => {
        console.log(error);
        return { status: EMAIL_VERIFICATION_STATUSES.SENT_ERROR };
      });
  };
}