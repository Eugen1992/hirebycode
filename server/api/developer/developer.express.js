const router = require('express').Router();
const DeveloperController = require('./developer.controller.js');

router.get('/',
    DeveloperController.getAll
);
router.get('/active',
    DeveloperController.getActive
);

router.get('/:id',
  DeveloperController.getById
);

router.get('/contacts/:id',
    DeveloperController.getContacts
);
module.exports = router;