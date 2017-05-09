const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const ObjectId = require('mongodb').ObjectId;

const extensionLookup = /(?:(\.[^.]+))?$/;

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'folder-name',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    req.imageFileName = new ObjectId();
    cb(null, req.imageFileName);
  }
});
const upload = multer({ storage }).single('userImage');

module.exports = function middleware (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
    }

    req.imageUpdated = !!req.file;
    next();
  });
}
