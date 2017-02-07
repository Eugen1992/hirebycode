const Repo = require('../../../models/repo');
const RepoServices = require('../../../services/repo');
const UserServices = require('../../../services/user');

const RepoDeveloperController = {
  get: (req, res, next) => {
    var userId =  req.userId;
    var providerLogin = req.login;
    if (userId) {
      RepoServices.getUserReposFull(userId, providerLogin).then(function (data) {
        res.send(JSON.stringify(data));
      });
    } else {
      res.sendStatus(500);
    }
  },
  deleteById: (req, res, next) => {
    Repo.find({ _id: req.params.id}).remove()
    .then(() => {
      return UserServices.deregisterRepo(req.userId, req.params.id);
    })
    .then(() => {
      return UserServices.updateSkills(req.userId);
    })
    .then(() => {
      res.send(200);
    }, (err) => {
      res.status(500).send(err);
    });
  },
  import: (req, res, next) => {
    let repo;

    RepoServices.import(req.body, req.userId)
    .then((importedRepo) => {
      repo = importedRepo;
      return repo;
    })
    .then((repo) => {
      return UserServices.registerRepo(req.userId, repo);
    })
    .then(() => {
      return UserServices.updateSkills(req.userId);
    })
    .then(() => {
      res.send(repo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },
  updateImported: (req, res, next) => {
    var login = req.login;
    var repo;
    
    if (login) {
      Repo.update({_id: req.params.id}, req.body)
      .then(function () {
        return UserServices.updateSkills(req.userId);
      })
      .then(() => {
        return UserServices.updateSkills(req.userId);
      })
      .then(function() {
        res.sendStatus(200);
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send(err);
      })
    } else {
      res.sendStatus(500);
    }
  },
  hideById: (req, res, next) => {
    RepoServices.hide(req.params.id)
    .then(() => UserServices.deregisterRepo(req.userId, req.params.id))
    .then(() => {
      return UserServices.updateSkills(req.userId);
    })
    .then(() => {
      return UserServices.updateTrainingCenters(req.userId)
    })
    .then(() => {
      res.send(200);
    }, (err) => {
      res.status(500).send(err);
    });
  },

  unhideById: (req, res, next) => {
    RepoServices.unhide(req.params.id)
    .then(() => UserServices.registerRepo(req.userId, req.params.id))
    .then(() => {
      return UserServices.updateSkills(req.userId);
    })
    .then(() => {
      return UserServices.updateTrainingCenters(req.userId)
    })
    .then(() => {
      res.send(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
  },
}

module.exports = RepoDeveloperController;