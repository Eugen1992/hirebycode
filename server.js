var session = require('express-session');
var express = require('express');
var server = express();

var underscore = _ = require('underscore');
var bodyParser = require('body-parser');
var localDB = 'mongodb://localhost:27017';

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

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

server.use(passport.initialize());
server.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: '11ab72fc5d5b195ee720',
    clientSecret: '3ab8338e26b13934fdefb7b59aa70b549651dcff',
    callbackURL: 'http://www.hirebycode.me/api/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('profile', accessToken);
    cb(null, profile);
  })
);



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


reposController.controller(server);
githubAuthController.controller(server);


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
