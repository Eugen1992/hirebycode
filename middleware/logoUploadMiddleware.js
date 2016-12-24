var multer = require('multer');
var upload = multer({ storage: getStorage() }).single('logo');


var extensionLookup = /(?:(\.[^.]+))?$/;

function getStorage () {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/assets/images/training-center-logos');
    },
    filename: function (req, file, cb) {
      var extension = extensionLookup.exec(file.originalname)[1];
      var fileName = req.userId + extension;
      req.logoFileName = fileName;
      cb(null, fileName);
    }
  });
}

function middleware (req, res, next) {
  upload(req, res, function (err) {
    if (!req.file) {
      req.logoUpdated = false;
    }
    req.logoUpdated = true;
    next();
  });
}

module.exports = middleware;