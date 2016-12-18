var session = require('express-session');
var express = require('express');
var server = express();

var bodyParser = require('body-parser');
var localDB = 'mongodb://localhost:27017';

var passport = require('passport');

var reposController = require('./controllers/reposController.js');
var userReposController = require('./controllers/userReposController.js');
var userDetailsController = require('./controllers/userDetailsController.js');
var githubAuthController = require('./controllers/githubAuthController.js');
var trainingCenterAuthController = require('./controllers/trainingCenterAuthController.js');
var skillsController = require('./controllers/skillsController.js');

var authMiddleware = require('./middleware/authMiddleware.js');

var expressHbs = require('express3-handlebars');

process.env.PWD = process.cwd();

server.engine('hbs', expressHbs({extname:'hbs'}));
server.set('view engine', 'hbs');

server.use(session({secret:'very secret'}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect(localDB);

server.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

require('./config/passport.js')(server);

server.use('/api/user/repos', authMiddleware);
server.use('/api/user/repos/*', authMiddleware);
server.use('/api/user/details', authMiddleware);

reposController.controller(server);
githubAuthController.controller(server);
trainingCenterAuthController.controller(server);
skillsController.controller(server);
userReposController.controller(server);
userDetailsController.controller(server);

require('./config/static.js')(server);


server.listen(80, '127.0.0.1', function () {
  console.log('listening on 80!');
});
