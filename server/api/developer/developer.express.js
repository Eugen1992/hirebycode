const router = require('express').Router();
const DeveloperController = require('./developer.controller.js');
const authorizeMiddleware = require('../../middleware/authorizeMiddleware.js');
const jwtMiddleware = require('../../middleware/jwtMiddleware.js');

router.get('/',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  DeveloperController.getAll
);

router.get('/active',
  DeveloperController.getActive
);

router.get('/:id',
  DeveloperController.getById
);

router.get('/full/:id',
  DeveloperController.getFullById
);


router.get('/contacts/:id',
  DeveloperController.getContacts
);

module.exports = router;
