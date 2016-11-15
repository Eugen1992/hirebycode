var express = require('express');

module.exports = function (app) {
  app.use('/client', express.static(process.env.PWD + '/client'));
  app.use('/node_modules', express.static(process.env.PWD + '/node_modules'));
  app.get('*', function(req, res) {
    if (req.url.indexOf('/api/') === -1) {
    	res.render('index');
      //res.sendfile(process.env.PWD + '/index.html');
    }
  });
};