(function () {
  angular.module('showroom').service('TrainingCenterService', TrainingCenterService);

  TrainingCenterService.$inject = ['$http', '$q', 'UserLocalService', 'Upload'];
  function TrainingCenterService ($http, $q, userLocal, upload) {
    this.update = function (user, logo) {
      if (logo) {
        user.logo = logo;
      }
      return upload.upload({
        url: 'api/training-center/details',
        method: 'PUT',
        data: user,
      }).then(function(response) {
      }, function (error) {
        console.log(error);
      });
    }
  }
})();