const cloudinary = require('cloudinary');

module.exports = function getImageUrlCloudinary (fileName) {
  if (!fileName) {
    return '/client/assets/images/placeholder.png';
  }
  return cloudinary.url(`folder-name/${fileName}`).replace('http://', '//');
}