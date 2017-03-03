const multer = require('multer');
const upload = multer({ storage: getStorage() }).single('avatar');


const extensionLookup = /(?:(\.[^.]+))?$/;

function getStorage () {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/assets/images/developers-avatars');
    },
    filename: function (req, file, cb) {
      var extension = extensionLookup.exec(file.originalname)[1];
      var fileName = req.userId + extension;
      req.avatarFileName = fileName;
      cb(null, fileName);
    }
  });
}

module.exports = function middleware (req, res, next) {
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
