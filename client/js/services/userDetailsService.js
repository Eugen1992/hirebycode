(function () {
  angular.module('showroom').service('UserDetailsService', UserDetailsService);

  UserDetailsService.$inject = ['$http', '$q'];
  function UserDetailsService ($http, $q) {
    var userData;
    var fetched = false;
    this.fetchUserDetails = function () {
      if (fetched) {
        return $q(function (resolve) {
          resolve(userData);
        });
      } else {
        return $http.get('/api/user/details').then(function(response) {
          userData = response.data;
          fetched = true;
          return userData;
        });
      }
    }
    this.getContactsById = function (userId) {
      return $http.get('/api/repos/contacts/' + userId).then(function(response) {
          return response.data;
      });
    }
    this.updateUserDetails = function (data) {
      return $http.put('/api/training-center/details', data);
    }
  }
})();