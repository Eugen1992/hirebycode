(function () {
  angular.module('showroom').service('TrainingCentersService', TrainingCentersService);

  TrainingCentersService.$inject = ['$http', '$q', 'UserLocalService', 'Upload'];
  function TrainingCentersService ($http, $q, userLocal, upload) {
    var trainingCenterRepos;

    this.getAll = function () {
      return $http.get('api/training-center').then(function (response) {
        return response.data;
      });
    }
    this.approveRepo = function (repo) {
      return $http.put('api/repo/training-center', {
        repoId: repo._id,
        approved: true
      }).then(function () {
        trainingCenterRepos.pending.splice(trainingCenterRepos.pending.indexOf(repo), 1);
        trainingCenterRepos.approved.push(repo);
      }, function () {

      });
    }
    this.disapproveRepo = function (repo) {
      return $http.put('api/repo/training-center', {
        repoId: repo._id,
        approved: false
      }).then(function () {
        trainingCenterRepos.approved.splice(trainingCenterRepos.pending.indexOf(repo), 1);
        trainingCenterRepos.pending.push(repo);
      }, function () {

      });
    }
    this.getTrainingCenterRepos = function (id) {
      return $http.get('api/repo/training-center/').then(function (response) {
        trainingCenterRepos = response.data;
        return trainingCenterRepos;
      });
    }
  }
})();