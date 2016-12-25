(function () {
  angular.module('showroom').service('TrainingCentersService', TrainingCentersService);

  TrainingCentersService.$inject = ['$http', '$q', 'UserLocalService', 'Upload'];
  function TrainingCentersService ($http, $q, userLocal, upload) {
    this.update = function (user, logo) {
      if (logo) {
        user.logo = logo;
      }
      return upload.upload({
        url: 'api/training-center/details',
        method: 'PUT',
        data: user,
      }).then(function(response) {
        userLocal.setUser(response.data);
        return response.data;
      }, function (error) {
        console.log(error);
      });
    }
    this.getAll = function () {
      return $http.get('api/training-center').then(function (response) {
        return response.data;
      }, function (error) {
        console.log(error);
      });
    }
  }
})();