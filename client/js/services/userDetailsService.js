(function () {
  angular.module('showroom').service('UserDetailsService', UserDetailsService);

  UserDetailsService.$inject = ['$http']
  function UserDetailsService ($http) {
    var userData;
    this.fetchUserDetails = function () {
      return $http.get('/api/user/details').then(function(response) {
        userData = response.data;
        return userData;
      });
    }
    this.updateUserDetails = function (data) {
      return $http.put('/api/user/details', data);
    }
  }
})();