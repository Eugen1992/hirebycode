const router = require('express').Router();
const RepoController = require('./repo.controller');

router.use('/developer', require('./developer/repo-developer.express.js'));
router.use('/training-center', require('./training-center/repo-training-center.express.js'));

router.get('/',
  RepoController.get
);

router.get('/:id',
  RepoController.getById
);

module.exports = router;