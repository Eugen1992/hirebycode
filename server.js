var session = require('express-session');
var express = require('express');
var server = express();

var underscore = _ = require("underscore");
var bodyParser = require("body-parser");
var localDB = 'mongodb://localhost:27017';


server.use(session({secret:'very secret'}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect(localDB);

var reposController = require('./controllers/reposController.js');
var githubAuthController = require('./controllers/githubAuthController.js');

reposController.controller(server);
githubAuthController.controller(server);

process.env.PWD = process.cwd();

server.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

server.use('/client', express.static(process.env.PWD + '/client'));
server.use('/node_modules', express.static(process.env.PWD + '/node_modules'));
server.get('*', function(req, res) {
  if (req.url.indexOf('/api/') === -1) {
    res.sendfile(process.env.PWD + '/index.html');  
  }
});


server.listen(80, '127.0.0.1', function () {
  console.log('listening on 80!');
});
