const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const extensionLookup = /(?:(\.[^.]+))?$/;

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'folder-name',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    const extension = extensionLookup.exec(file.originalname)[1];
    const fileName = req.userId + extension;
    console.log(extension);
    req.imageFileName = fileName;
    cb(null, req.userId);
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
