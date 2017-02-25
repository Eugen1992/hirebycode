const router = require('express').Router();
const UserController = require('./user.controller');

const trainingCenterLogoMiddleware = require('../../middleware/logoUploadMiddleware');
const developerAvatarMiddleware = require('../../middleware/developerAvatarUploadMiddleware');

const jwtMiddleware = require('../../middleware/jwtMiddleware');
const authorizeMiddleware = require('../../middleware/authorizeMiddleware');

router.get('/training-center/details',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  UserController.getTrainingCenterDetails
);
router.put('/training-center/details',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  UserController.updateTrainingCenterDetails
);

router.get('/developer/details',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  UserController.getDeveloperDetails
);
router.put('/developer/details',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  UserController.updateDeveloperDetails
);
router.put('/developer/avatar',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  developerAvatarMiddleware,
  UserController.updateDeveloperAvatar
);
router.put('/developer/account-status',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  UserController.updateDeveloperAccountStatus
);

module.exports = router;