const router = require('express').Router();
const RepoDeveloperController = require('./repo-developer.controller');
var userAuthorizeMiddleware = require('../../../middleware/userAuthorizeMiddleware.js');

router.get('/',
  userAuthorizeMiddleware,
  RepoDeveloperController.get
);

router.post('/',
  userAuthorizeMiddleware,
  RepoDeveloperController.import
);


router.delete('/:id',
  userAuthorizeMiddleware,
  RepoDeveloperController.deleteById
);

router.put('/:id',
  userAuthorizeMiddleware,
  RepoDeveloperController.updateImported
);

router.put('/hide/:id',
  userAuthorizeMiddleware,
  RepoDeveloperController.hideById
);

router.put('/unhide/:id',
  userAuthorizeMiddleware,
  RepoDeveloperController.unhideById
);

module.exports = router;