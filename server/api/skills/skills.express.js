const router = require('express').Router();
const SkillsController = require('./skills.controller.js');


router.get('/',
  SkillsController.get
);

router.post('/',
  SkillsController.create
);

router.delete('/:id',
  SkillsController.remove
);

module.exports = router;