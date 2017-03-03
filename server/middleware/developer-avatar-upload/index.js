const isProduction = process.env.ENV === 'production';

if (isProduction) {
  module.exports = require('./cloudinary.js');
} else {
  module.exports = require('./local.js');
}