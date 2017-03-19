DeveloperService.$inject = ['$http'];
angular.module('showroom').service('DeveloperService', DeveloperService);

function DeveloperService ($http) {
  this.getDeveloperById = function (id) {
    return $http.get('/api/developer/' + id).then(function (response) {
      return response.data;
    });
  }
  this.getContactsById = function (userId, captcha) {
    return $http.get('/api/developer/contacts/' + userId + '/' + captcha).then(function(response) {
        return response.data;
    });
  }
  this.getDevelopers = function () {
    return $http.get('/api/developer').then(function(response) {
      return response.data;
    });
  }
  this.getActiveDevelopers = function (filters) {
    filters = filters || {};

    return $http.get('/api/developer/active', {
        params: {
          skill: Object.keys(filters.skill).join(','),
          location: filters.location && filters.location.placeId,
          school: filters.school && filters.school._id
        }
      }).then(function(response) {
      return response.data;
    });
  }
}