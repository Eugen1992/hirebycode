const cloudinary = require('cloudinary');

module.exports = function getImageUrlCloudinary (fileName) {
  return cloudinary.url(`folder-name/${fileName}`);
}