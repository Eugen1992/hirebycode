const router = require('express').Router();
const DeveloperController = require('./developer.controller.js');
const authorizeMiddleware = require('../../middleware/authorize.middleware.js');
const jwtMiddleware = require('../../middleware/jwt.middleware.js');
const captchaMiddleware = require('../../middleware/captcha.middleware.js');

router.get('/',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  DeveloperController.getAll
);

router.get('/active',
  DeveloperController.getActive
);

router.get('/training-center/:id',
  DeveloperController.getByTrainingCenter
);

router.get('/:id',
  DeveloperController.getById
);

router.get('/full/:id',
  DeveloperController.getFullById
);


router.get('/contacts/:id/:captcha',
  captchaMiddleware,
  DeveloperController.getContacts
);

module.exports = router;
