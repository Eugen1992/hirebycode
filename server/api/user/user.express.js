const router = require('express').Router();
const UserController = require('./user.controller');
const userAuthorizeMiddleware = require('../../middleware/userAuthorizeMiddleware.js');
const trainingCenterAuthorizeMiddleware = require('../../middleware/trainingCenterAuthorizeMiddleware');
const uploadMiddleware = require('../../middleware/logoUploadMiddleware');

router.get('/contacts/:userId',
  UserController.getContactsById
);
router.get('/training-center/details',
  userAuthorizeMiddleware,
  UserController.getTrainingCenterDetails
);
router.put('/training-center/details',
  userAuthorizeMiddleware,
  trainingCenterAuthorizeMiddleware,
  uploadMiddleware,
  UserController.updateTrainingCenterDetails
);
router.get('/developer/details',
  userAuthorizeMiddleware,
  UserController.getDeveloperDetails
);
router.put('/developer/details',
  userAuthorizeMiddleware,
  UserController.updateDeveloperDetails
);


module.exports = router;