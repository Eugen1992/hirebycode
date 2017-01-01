(function () {
  angular.module('showroom').service('TrainingCentersService', TrainingCentersService);

  TrainingCentersService.$inject = ['$http', '$q', 'UserLocalService', 'Upload'];
  function TrainingCentersService ($http, $q, userLocal, upload) {
    this.approveRepo = function (repoId) {
      return $http.put('api/repo/training-center', {
        repoId: repoId,
        approved: true
      })
    }
    this.disaproveRepo = function (repoId) {
      return $http.put('api/repo/training-center', {
        repoId: repoId,
        approved: false
      })
    }
    this.getTrainingCenterRepos = function (id) {
      return $http.get('api/repo/training-center/').then(function (response) {
        return response.data;
      }, function (error) {
        console.log(error);
      });
    }
  }
})();