var request = require('request');
var querystring = require('querystring');
var token;

function controller(app) {
  app.post('/api/auth/github', function(clientRequest, clientResponse) {
    var url = 'https://github.com/login/oauth/access_token';
    
    url += '?client_id=11ab72fc5d5b195ee720';
    url += '&client_secret=3ab8338e26b13934fdefb7b59aa70b549651dcff';
    url += '&code=' + clientRequest.body.code;
    request.post(url, {}, function (err, githubResponse, newToken) {  
      if (!err) {
        token = newToken;
        getUserData(token, handleUserData);
      }
      function handleUserData (userData) {
        clientRequest.session.email = userData.email;
        clientRequest.session.login = userData.login;
        clientResponse.sendStatus(200);
      }
    });
  });
}
function getUserData(token, callback) {
  var parsedResponse = querystring.parse(token);
  var options = {
    url: 'https://api.github.com/user',
    headers: {
      'User-Agent': 'HireByCode',
      'Authorization': 'token ' + parsedResponse.access_token
    }
  }
  return request.get(options, function (err, response) {
    var userData = JSON.parse(response.body);
    callback(userData);
  });
}
module.exports.controller = controller;