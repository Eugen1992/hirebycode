const router = require('express').Router();
const RepoTrainingCenterController = require('./repo-training-center.controller');
const authorizeMiddleware = require('../../../middleware/authorizeMiddleware.js');
const jwtMidleware = require('../../../middleware/jwtMiddleware.js');

router.get('/',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'training-center'}),
  RepoTrainingCenterController.get
);

router.put('/',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'training-center'}),
  RepoTrainingCenterController.toggleApprove
);

router.delete('/:id',
  jwtMidleware.decodeToken,
  authorizeMiddleware({userType: 'training-center'}),
  RepoTrainingCenterController.discard
);

module.exports = router;