var request = require('request');
var querystring = require('querystring');
var skills = require('../skills.json');
var token;

function controller(app) {
  app.get('/api/skills-set', function(request, response) {
    response.send(skills);
  });
}
module.exports.controller = controller;