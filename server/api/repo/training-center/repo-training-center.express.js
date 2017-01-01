const router = require('express').Router();
const RepoTrainingCenterController = require('./repo-training-center.controller');
var userAuthorizeMiddleware = require('../../../middleware/userAuthorizeMiddleware.js');
var trainingCenterAuthorizeMiddleware = require('../../../middleware/trainingCenterAuthorizeMiddleware');

router.get('/',
  userAuthorizeMiddleware,
  trainingCenterAuthorizeMiddleware,
  RepoTrainingCenterController.get
);

router.put('/',
  userAuthorizeMiddleware,
  trainingCenterAuthorizeMiddleware,
  RepoTrainingCenterController.toggleApprove
);

router.delete('/:id',
  userAuthorizeMiddleware,
  trainingCenterAuthorizeMiddleware,
  RepoTrainingCenterController.discard
);

module.exports = router;