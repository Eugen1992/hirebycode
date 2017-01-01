const router = require('express').Router();
const SkillsController = require('./skills.controller.js');


router.get('',
  SkillsController.get
);

module.exports = router;