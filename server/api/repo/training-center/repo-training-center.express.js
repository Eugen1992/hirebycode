const router = require('express').Router();
const RepoTrainingCenterController = require('./repo-training-center.controller');
const authorizeMiddleware = require('../../../middleware/authorizeMiddleware.js');
const jwtMidleware = require('../../../middleware/jwtMiddleware.js');

router.get('/',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  RepoTrainingCenterController.get
);

router.put('/',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  RepoTrainingCenterController.toggleApprove
);

router.delete('/:id',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'trainingCenter'}),
  RepoTrainingCenterController.discard
);

module.exports = router;