const fs = require('fs');
const path = require('path');
const userImagesFolder = path.resolve('');
module.exports = function getImageUrlLocal (fileName) { 
  return `/client/assets/images/user-images/${fileName}`;
}
