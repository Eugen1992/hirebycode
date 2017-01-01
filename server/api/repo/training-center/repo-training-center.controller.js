const Repo = require('../../../models/repo');

const RepoTrainingCenterController = {
  get: (req, res, next) => {
    Repo.getTrainingCenterRequests(req.userId).then(function (centerRepos) {
      res.send(centerRepos);
    }, function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  },
  toggleApprove: (req, res, next) => {
    if (req.body.approved) {
      Repo.approveTrainingCenterStatus({
        repoId: req.body.repoId,
        trainingCenterId: req.userId,
        approved: true
      }).then(function (repo) {
        response.send(repo);
      }, function (err) {
        response.sendStatus(500);
      });
    } else {
      Repo.disapproveTrainingCenterStatus({
        repoId: req.body.repoId,
        trainingCenterId: req.userId,
        approved: false
      }).then(function (repo) {
        response.send(repo);
      }, function (err) {
        response.sendStatus(500);
      });
    }
  },
  discard: (req, res, next) => {
    res.send('404');
  }
}

module.exports = RepoTrainingCenterController;
