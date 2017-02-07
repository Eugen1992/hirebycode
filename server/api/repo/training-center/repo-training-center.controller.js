const Repo = require('../../../models/repo');
const RepoServices = require('../../../services/repo');
const UserServices = require('../../../services/user');

const RepoTrainingCenterController = {
  get: (req, res, next) => {
    Repo.getTrainingCenterRepos(req.userId).then(function (centerRepos) {
      res.send(centerRepos);
    }, function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  },
  toggleApprove: (req, res, next) => {
    RepoServices.toggleTrainingCenterStatus({
      repoId: req.body.repoId,
      trainingCenterId: req.userId,
      approved: req.body.approved
    })
    .then((repo) => {
      return UserServices.updateTrainingCenters(repo.developer)
      .then(() => {
        return repo;
      });
    })
    .then((repo) => {
      res.send(repo);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
  },
  discard: (req, res, next) => {
    res.send('404');
  }
}

module.exports = RepoTrainingCenterController;
