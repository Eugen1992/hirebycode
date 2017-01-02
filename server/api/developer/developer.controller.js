const User = require('../../models/user.js');
const Repo = require('../../models/repo.js');
const Promise = require('promise');

const DeveloperController = {
  getById: (req, res, next) => {
    Promise.all([
      User.getContacts(req.params.id),
      Repo.getDeveloperRepos(req.params.id)
    ]).then(function(results) {
      console.log(results);
      const result = {
        info: results[0],
        repos: results[1]
      };
      res.send(result);
    }, function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  }
}

module.exports = DeveloperController;