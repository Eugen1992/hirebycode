const router = require('express').Router();
const AuthController = require('./authenticate.controller');
const passport = require('passport');
const authorizeMiddleware = require('../../middleware/authorizeMiddleware');
const jwtMiddleware = require('../../middleware/jwtMiddleware');


router.get('/github',
  passport.authenticate('github', { failureRedirect: '/' }),
  jwtMiddleware.createToken,
  AuthController.github
);

router.put('/training',
  passport.authenticate('training-center'),
  jwtMiddleware.createToken,
  AuthController.trainingCenter
);

router.put('/admin',
  passport.authenticate('admin'),
  jwtMiddleware.createToken,
  AuthController.admin
);

router.post('/training',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'admin'}),
  passport.authenticate('training-center-signup'),
  AuthController.trainingCenterSignup
);


module.exports = router;