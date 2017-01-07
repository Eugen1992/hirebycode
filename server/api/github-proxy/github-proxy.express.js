const router = require('express').Router();
const GithubProxyController = require('./github-proxy.controller.js');


router.get('/:url',
  GithubProxyController.get
);

module.exports = router;