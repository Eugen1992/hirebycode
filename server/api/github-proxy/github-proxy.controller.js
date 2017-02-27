const Promise = require('promise');
const request = require('request');

const GithubProxyController = {
  get: (req, res, next) => {
    console.log(req.params.url);
    const options = {
      url: req.params.url + '?client_id=11ab72fc5d5b195ee720&client_secret=3ab8338e26b13934fdefb7b59aa70b549651dcff',
      headers: {
        'User-Agent': 'HireByCode',
        'Accept': 'application/vnd.github.v3.raw+json'
      }
    };
    request.get(options, (error, response, body) => {
      try {
        const parsedBody = JSON.parse(body);
        if (parsedBody.message === 'This repository is empty.') {
          res.status(404).send('error:empty-repository');
        }
      } catch (e) {
        //body is not JSON
      }
      
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    });
  }
}

module.exports = GithubProxyController;