var session = require('express-session');
var express = require('express');
var server = express();

var User = require('./models/user');

var bodyParser = require('body-parser');
var localDB = 'mongodb://localhost:27017';

var passport = require('passport');

var reposController = require('./controllers/reposController.js');
var githubAuthController = require('./controllers/githubAuth.js');

server.use(session({secret:'very secret'}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect(localDB);

process.env.PWD = process.cwd();

server.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

require('./config/passport.js')(server);

server.use('/api/repos/*', function (req, res, next) {
  var token = req.headers.authorization;
  if (req.headers.authorization) {
    User.findOne({token: req.headers.authorization}, function (err, user) {
      if (err) {
        res.sendStatus(500);
      }
      req.login = user.githubLogin;
      next();  
    });
  } else {
    res.sendStatus(401);
  }
});

reposController.controller(server);
githubAuthController.controller(server);

require('./config/static.js')(server);


server.listen(80, '127.0.0.1', function () {
  console.log('listening on 80!');
});
