const router = require('express').Router();
const AuthController = require('./authenticate.controller');
var passport = require('passport');
var jwtMiddleware = require('../../middleware/jwtMiddleware.js');

router.get('/github',
  passport.authenticate('github', { failureRedirect: '/' }),
  jwtMiddleware,
  AuthController.github
);

router.put('/training',
  passport.authenticate('training-center'),
  jwtMiddleware,
  AuthController.trainingCenter
);

router.put('/admin',
  passport.authenticate('admin'),
  jwtMiddleware,
  AuthController.admin
);

router.post('/training',
  passport.authenticate('training-center-signup'),
  jwtMiddleware,
  AuthController.trainingCenterSignup
);


module.exports = router;