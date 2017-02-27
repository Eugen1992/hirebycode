const Promise = require('promise');
const request = require('request');

const GithubProxyController = {
  get: (req, res, next) => {
    const secret = process.env.GITHUB_SECRET;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const options = {
      url: `${req.params.url}?client_id=${clientId}&client_secret=${secret}`,
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