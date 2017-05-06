const router = require('express').Router();
const UserController = require('./user.controller');

const userImageUpload = require('../../middleware/user-image-upload');

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
  userImageUpload,
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
  userImageUpload,
  UserController.updateDeveloperAvatar
);
router.put('/developer/account-status',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  UserController.updateDeveloperAccountStatus
);
router.put('/training-center/account-status',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  UserController.updateTrainingCenterAccountStatus
);
router.get('/start-email-verification',
  jwtMiddleware.decodeToken,
  authorizeMiddleware(),
  UserController.startEmailVerification
);
module.exports = router;