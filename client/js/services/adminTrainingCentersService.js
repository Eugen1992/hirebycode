(function () {
  angular.module('showroom').service('AdminTrainingCentersService', AdminTrainingCentersService);

  AdminTrainingCentersService.$inject = ['$http', '$q'];
  function AdminTrainingCentersService ($http, $q) {
    var trainingCenters, fetched;

    this.createTrainingCenter = function (password, login, name) {
      return $http.post('/api/auth/training', {
        password: password,
        login: login,
        name: name
      }).then(function (response) {
        return response.data;
      });
    }
    this.removeTrainingCenter = function (trainingCenter) {
      return $http.delete('api/training-center/' + trainingCenter._id).then(function() {
        trainingCenters.splice(trainingCenters.indexOf(trainingCenter), 1);
        return trainingCenters;
      });
    }
    this.getTrainingCenters = function () {
      if (fetched) {
        return $q(function (resolve, reject) {
          resolve(trainingCenters);
        })
      } else {
        return $http.get('/api/training-center/full').then(function(response) {
          fetched = true;
          trainingCenters = response.data;
          return response.data;
        });
      }
    }
    this.getTrainingCenterById = function (id) {
      return $http.get('/api/training-center/full/' + id).then(function(response) {
        fetched = true;
        trainingCenters = response.data;
        return response.data;
      });
    }
    this.getTrainingCenterRepos = function (id) {
      return $http.get('api/training-center/repos/' + id).then(function (response) {
        trainingCenterRepos = response.data;
        return trainingCenterRepos;
      });
    }
  }
})();
