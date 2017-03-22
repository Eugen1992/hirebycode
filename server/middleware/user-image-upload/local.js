const multer = require('multer');
const upload = multer({ storage: getStorage() }).single('userImage');


const extensionLookup = /(?:(\.[^.]+))?$/;

function getStorage () {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/assets/images/user-images');
    },
    filename: function (req, file, cb) {
      const extension = extensionLookup.exec(file.originalname)[1];
      const fileName = req.userId.toString();
      req.imageFileName = fileName;
      cb(null, fileName);
    }
  });
}

module.exports = function middleware (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
    }

    req.imageUpdated = !!req.file;
    next();
  });
}
