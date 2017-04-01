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
    this.getTrainingCenterDetailsById = function (id) {
      return $http.get('/api/training-center/' + id).then(function(response) {
        return response.data;
     });
    }
    this.changeRepoStatus = function (repo, newStatus) {
      return $http.put('api/repo/training-center', {
        repoId: repo._id,
        status: newStatus,
        message: repo.trainingCenterMessage
      }).then(function () {
        var oldStatus = repo.trainingCenterStatus;
        repo.trainingCenterStatus = newStatus;
        trainingCenterRepos[oldStatus].splice(trainingCenterRepos[oldStatus].indexOf(repo), 1);
        trainingCenterRepos[newStatus].push(repo);
      }, function () {

      });
    }
    this.getTrainingCenterRepos = function () {
      return $http.get('api/repo/training-center/').then(function (response) {
        trainingCenterRepos = response.data;
        return trainingCenterRepos;
      });
    }
  }
})();