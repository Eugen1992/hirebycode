const router = require('express').Router();

const TrainingCenterController = require('./training-center.controller');
const authorizeMiddleware = require('../../middleware/authorize.middleware');
const jwtMiddleware = require('../../middleware/jwt.middleware');

router.get('/full',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  TrainingCenterController.getTrainingCentersFullList
);

router.get('/full/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  TrainingCenterController.getFullTrainingCenterById
);

router.get('/repos/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  TrainingCenterController.getFullTrainingCenterRepos
);

router.get('/:id',
  TrainingCenterController.getTrainingCenter
);

router.delete('/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  TrainingCenterController.removeTrainingCenter
);

router.get('/',
  TrainingCenterController.getTrainingCentersList
);


module.exports = router;