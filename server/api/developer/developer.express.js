const router = require('express').Router();
const DeveloperController = require('./developer.controller.js');
const userAuthorizeMiddleware = require('../../middleware/userAuthorizeMiddleware.js');
const adminAuthorizeMiddleware = require('../../middleware/adminAuthorizeMiddleware.js');

router.get('/',
  userAuthorizeMiddleware,
  adminAuthorizeMiddleware,
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
