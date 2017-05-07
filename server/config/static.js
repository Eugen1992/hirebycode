const express = require('express');
const compression = require('compression')
const verifyEmailMiddleware = require('../middleware/verify-email.middleware.js');

module.exports = function (app) {
  var expressHbs = require('express3-handlebars');

  app.use(compression());
  app.engine('hbs', expressHbs({ extname: 'hbs' }));
  app.set('view engine', 'hbs');

  app.use('/client', express.static(process.env.PWD + '/client'));
  app.use('/node_modules', express.static(process.env.PWD + '/node_modules'));
  app.get('/verify-email/:token', 
    verifyEmailMiddleware,
    function(req, res) {
      const preloadedData = { emailVerificationResult: req.emailVerificationResult };
      res.render('index', { env: process.env.ENV, preloadedData: JSON.stringify(preloadedData) });
    }
  );
  app.get('*', function(req, res) {
    if (req.url.indexOf('/api/') === -1) {
      res.render('index', { env: process.env.ENV });
    }
  });
};