const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "hirebycode@gmail.com",
        pass: "tolkodneprtolkopobeda"
    }
});

module.exports = {
  sendVerificationEmail: require('./send-verification-email.service.js')(smtpTransport),
}