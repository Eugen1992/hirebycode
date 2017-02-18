var session = require('express-session');
var express = require('express');
var server = express();

var bodyParser = require('body-parser');
var dbUrl = process.env.MONGODB_URI || '127.0.0.1:27017';

var mongoose = require('mongoose');

process.env.PWD = process.cwd();
mongoose.connect(dbUrl);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

require('./server/config/passport.js')(server);
server.use('/api', require('./server/api'));
require('./server/config/static.js')(server);

server.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

const port = process.env.PORT || 80;

server.listen(port, function () {
  console.log(`listening on ${port}!`);
});
