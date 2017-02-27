var multer = require('multer');
var upload = multer({ storage: getStorage() }).single('avatar');


var extensionLookup = /(?:(\.[^.]+))?$/;

function getStorage () {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/assets/images/developers-avatars');
    },
    filename: function (req, file, cb) {
      var extension = extensionLookup.exec(file.originalname)[1];
      console.log(file.originalname);
      var fileName = req.userId + extension;
      req.avatarFileName = fileName;
      cb(null, fileName);
    }
  });
}

function middleware (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
    }
    if (req.file) {
      req.avatarUpdated = true;
    } else {
      req.avatarUpdated = false;
    }
    next();
  });
}

module.exports = middleware;