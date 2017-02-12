const router = require('express').Router();
const LocationController = require('./location.controller.js');

router.get('/',
  LocationController.get
);

module.exports = router;