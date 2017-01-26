const router = require('express').Router();

const TrainingCenterController = require('./training-center.controller');
const userAuthorizeMiddleware = require('../../middleware/userAuthorizeMiddleware.js');
const adminAuthorizeMiddleware = require('../../middleware/adminAuthorizeMiddleware');

router.get('/full',
  userAuthorizeMiddleware,
  adminAuthorizeMiddleware,
  TrainingCenterController.getTrainingCentersFullList
);

router.get('/full/:id',
  userAuthorizeMiddleware,
  adminAuthorizeMiddleware,
  TrainingCenterController.getFullTrainingCenterById
);

router.delete('/:id',
  userAuthorizeMiddleware,
  adminAuthorizeMiddleware,
  TrainingCenterController.removeTrainingCenter
);

router.get('/',
  userAuthorizeMiddleware,
  TrainingCenterController.getTrainingCentersList
);


module.exports = router;