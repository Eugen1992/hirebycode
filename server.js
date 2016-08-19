var express = require('express');
var server = express();

var underscore = _ = require("underscore");
var bodyParser = require("body-parser");
var localDB = 'mongodb://localhost:27017';


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect(localDB);

var reposController = require('./controllers/repos.js');
reposController.controller(server);

process.env.PWD = process.cwd();

server.use('/client', express.static(process.env.PWD + '/client'));
server.use('/node_modules', express.static(process.env.PWD + '/node_modules'));
server.get('/', function (req, res) {
  res.sendFile(process.env.PWD + '/index.html');
});

server.listen(3001);
console.log('listening on 3001!');