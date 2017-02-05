const router = require('express').Router();
const SkillsController = require('./skills.controller.js');
const passport = require('passport');
const jwtMiddleware = require('../../middleware/jwtMiddleware.js');
const adminAuthorizeMiddleware = require('../../middleware/adminAuthorizeMiddleware.js');

router.get('/',
  SkillsController.get
);

router.post('/',
  //jwtMiddleware,
  //adminAuthorizeMiddleware,
  SkillsController.create
);

router.delete('/:id',
  jwtMiddleware,
  adminAuthorizeMiddleware,
  SkillsController.remove
);

module.exports = router;