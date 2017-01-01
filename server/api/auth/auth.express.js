const router = require('express').Router();
const AuthController = require('./auth.controller');
var passport = require('passport');
var jwtMiddleware = require('../../middleware/jwtMiddleware.js');

router.get('/github',
  passport.authenticate('github', {failureRedirect: '/'}),
  jwtMiddleware,
  AuthController.github
);

router.put('/training',
  passport.authenticate('local'),
  jwtMiddleware,
  AuthController.local
);

module.exports = router;