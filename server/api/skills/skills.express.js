const router = require('express').Router();
const SkillsController = require('./skills.controller.js');
const passport = require('passport');
const jwtMiddleware = require('../../middleware/jwtMiddleware.js');
const adminAuthorizeMiddleware = require('../../middleware/adminAuthorizeMiddleware.js');

router.get('/',
  SkillsController.get
);

router.post('/',
  passport.authenticate('admin'),
  jwtMiddleware,
  adminAuthorizeMiddleware,
  SkillsController.create
);

router.delete('/:id',
  passport.authenticate('admin'),
  jwtMiddleware,
  adminAuthorizeMiddleware,
  SkillsController.remove
);

module.exports = router;