const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "hirebycode@gmail.com",
        pass: "tolkodneprtolkopobeda"
    }
});

const hbs = require('nodemailer-express-handlebars');
const options = {
  viewEngine: {
   extname: '.hbs'
  },
  viewPath: 'views/email/',
  extName: '.hbs'
};

smtpTransport.use('compile', hbs(options));

module.exports = {
  sendVerificationEmail: require('./send-verification-email.service.js')(smtpTransport),
}