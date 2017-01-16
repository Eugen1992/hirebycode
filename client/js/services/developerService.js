DeveloperService.$inject = ['$http'];
angular.module('showroom').service('DeveloperService', DeveloperService);

function DeveloperService ($http) {
  this.getDeveloperById = function (id) {
    return $http.get('/api/developer/' + id).then(function (response) {
      return response.data;
    });
  }
  this.getContactsById = function (userId) {
    return $http.get('/api/developer/contacts/' + userId).then(function(response) {
        return response.data;
    });
  }
  this.getDevelopers = function () {
    return $http.get('/api/developer').then(function(response) {
      return response.data;
    });
  }
  this.getActiveDevelopers = function () {
    return $http.get('/api/developer/active').then(function(response) {
      return response.data;
    });
  }
}