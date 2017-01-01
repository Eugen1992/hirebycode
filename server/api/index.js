'use strict';

const router = require('express').Router();

router.use('/auth', require('../api/auth/auth.express'));
router.use('/repo', require('../api/repo/repo.express'));
router.use('/user', require('../api/user/user.express'));
router.use('/skills', require('../api/skills/skills.express'));

module.exports = router;

