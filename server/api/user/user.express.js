const router = require('express').Router();
const UserController = require('./user.controller');
const userAuthorizeMiddleware = require('../../middleware/userAuthorizeMiddleware.js');
const trainingCenterAuthorizeMiddleware = require('../../middleware/trainingCenterAuthorizeMiddleware');
const trainingCenterLogoMiddleware = require('../../middleware/logoUploadMiddleware');
const developerAvatarMiddleware = require('../../middleware/developerAvatarUploadMiddleware');
const adminAuthorizeMiddleware = require('../../middleware/adminAuthorizeMiddleware');

router.get('/training-center/details',
  userAuthorizeMiddleware,
  UserController.getTrainingCenterDetails
);
router.put('/training-center/details',
  userAuthorizeMiddleware,
  trainingCenterAuthorizeMiddleware,
  trainingCenterLogoMiddleware,
  UserController.updateTrainingCenterDetails
);

router.get('/developer/details',
  userAuthorizeMiddleware,
  UserController.getDeveloperFullProfile
);
router.put('/developer/details',
  userAuthorizeMiddleware,
  developerAvatarMiddleware,
  UserController.updateDeveloperDetails
);
router.put('/developer/account-status',
  userAuthorizeMiddleware,
  UserController.updateDeveloperAccountStatus
);

module.exports = router;