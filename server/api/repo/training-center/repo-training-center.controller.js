const Repo = require('../../../models/repo');
const RepoServices = require('../../../services/repo');
const UserServices = require('../../../services/user');

const RepoTrainingCenterController = {
  get: (req, res, next) => {
    RepoServices.TrainingCenter.getTrainingCenterRepos(req.userId).then(function (centerRepos) {
      res.send(centerRepos);
    }, function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  },
  changeStatus: (req, res, next) => {
    RepoServices.TrainingCenter.changeTrainingCenterStatus({
      repoId: req.body.repoId,
      trainingCenterId: req.userId,
      status: req.body.status
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
