const router = require('express').Router();
const RepoTrainingCenterController = require('./repo-training-center.controller');
const authorizeMiddleware = require('../../../middleware/authorize.middleware.js');
const jwtMidleware = require('../../../middleware/jwt.middleware.js');

router.get('/',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  RepoTrainingCenterController.get
);

router.put('/',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  RepoTrainingCenterController.changeStatus
);

router.delete('/:id',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  RepoTrainingCenterController.discard
);

module.exports = router;