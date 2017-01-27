(function () {
  angular.module('showroom').service('AdminDevelopersService', AdminDevelopersService);

  AdminDevelopersService.$inject = ['$http', '$q'];
  function AdminDevelopersService ($http, $q) {
    var developers, fetched;

    this.getDevelopers = function () {
      if (fetched) {
        return $q(function (resolve, reject) {
          resolve(developers);
        })
      } else {
        return $http.get('/api/developer').then(function(response) {
          fetched = true;
          developers = response.data;
          return response.data;
        });
      }
    },
    this.getDeveloperById = function (id) {
      return $http.get('api/developer/full/' + id).then(function(response) {
        return response.data;
      });
    }
  }
})();
