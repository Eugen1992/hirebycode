const router = require('express').Router();
const SkillsController = require('./skills.controller.js');
const passport = require('passport');
const jwtMiddleware = require('../../middleware/jwtMiddleware.js');
const authorizeMiddleware = require('../../middleware/authorizeMiddleware.js');

router.get('/',
  SkillsController.get
);

router.post('/',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  SkillsController.create
);

router.put('/merge',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  SkillsController.merge
);

router.delete('/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  SkillsController.remove
);

module.exports = router;