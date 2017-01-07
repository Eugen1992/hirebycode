const Promise = require('promise');
const request = require('request');

const GithubProxyController = {
  get: (req, res, next) => {
    console.log();
    var options = {
      url: req.params.url + '?client_id=11ab72fc5d5b195ee720&client_secret=3ab8338e26b13934fdefb7b59aa70b549651dcff',
      headers: {
        'User-Agent': 'HireByCode'
      }
    };
    request.get(options,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(body);
        }
    })
  }
}

module.exports = GithubProxyController;