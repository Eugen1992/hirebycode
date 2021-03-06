const router = require('express').Router();
const RepoDeveloperController = require('./repo-developer.controller');
const authorizeMiddleware = require('../../../middleware/authorize.middleware.js');
const jwtMiddleware = require('../../../middleware/jwt.middleware.js');

router.get('/',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  RepoDeveloperController.get
);
router.get('/for-edit/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  RepoDeveloperController.getForEdit
);
router.post('/',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  RepoDeveloperController.import
);


router.delete('/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  RepoDeveloperController.deleteById
);

router.put('/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  RepoDeveloperController.updateImported
);

router.put('/hide/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  RepoDeveloperController.hideById
);

router.put('/unhide/:id',
  jwtMiddleware.decodeToken,
  authorizeMiddleware({userType: 'developer'}),
  RepoDeveloperController.unhideById
);

module.exports = router;