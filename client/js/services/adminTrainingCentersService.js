(function () {
  angular.module('showroom').service('AdminTrainingCentersService', AdminTrainingCentersService);

  AdminTrainingCentersService.$inject = ['$http'];
  function AdminTrainingCentersService ($http) {
    this.createTrainingCenter = function (password, login) {
      return $http.post('/api/auth/training', {
        password: password,
        login: login,
        name: name
      }).then(function (response) {
        return response.data;
      });
    }
    this.getContactsById = function (userId) {
      return $http.get('/api/developer/contacts/' + userId).then(function(response) {
          return response.data;
      });
    }
    this.getTrainingCenters = function () {
      return $http.get('/api/training-center/full').then(function(response) {
        return response.data;
      });
    }
    this.getActiveDevelopers = function () {
      return $http.get('/api/developer/active').then(function(response) {
        return response.data;
      });
    }
  }
})();
