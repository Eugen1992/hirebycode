DeveloperService.$inject = ['$http'];
angular.module('showroom').service('DeveloperService', DeveloperService);

function DeveloperService ($http) {
  this.getDeveloperById = function (id) {
    return $http.get('/api/developer/' + id).then(function (response) {
      return response.data;
    });
  }
}