const router = require('express').Router();
const DeveloperController = require('./developer.controller.js');


router.get('/:id',
  DeveloperController.getById
);

module.exports = router;