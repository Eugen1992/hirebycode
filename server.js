const session = require('express-session');
const express = require('express');
const server = express();
const dotenv = require('dotenv');

const bodyParser = require('body-parser');
const dbUrl = (process.env.MONGODB_URI || '127.0.0.1:27017') + '/hirebycode';

const mongoose = require('mongoose');

dotenv.load();
process.env.PWD = process.cwd();

const isProduction = process.env.ENV === 'production';
const isHeroku = process.env.ENV === 'production' || process.env.ENV === 'test';

mongoose.connect(dbUrl);

if (isProduction) {
  server.use('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    else {
      next();
    }
  });
}

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
const serverCallback = function () {
  console.log(`listening on ${port}!`);
};
const serverParams = [port, serverCallback];
if (!isHeroku) {
  //need to specify localhost ip
  //in order to use 'hirebycode' domain from hosts file on local machine
  serverParams.splice(1, 0, '127.0.0.1');
}

server.listen.apply(server, serverParams);
