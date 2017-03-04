const isProduction = process.env.ENV === 'production';
let getImageUrlService;

if (isProduction) {
  getImageUrlService = require('./get-user-image-url-cloudinary');
} else {
  getImageUrlService = require('./get-user-image-url-local');
}

module.exports = {
  getImageUrl: getImageUrlService
};