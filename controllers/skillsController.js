var skills = require('../skills.json');

function controller(app) {
  app.get('/api/skills-set', function(request, response) {
    response.send(skills);
  });
}
module.exports.controller = controller;