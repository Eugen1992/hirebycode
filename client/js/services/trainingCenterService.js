(function () {
  angular.module('showroom').service('TrainingCenterService', TrainingCenterService);

  TrainingCenterService.$inject = ['$http', '$q'];
  function TrainingCenterService ($http, $q) {
    this.updateDetails = function (data) {
      $http.put('api/training-center/details', data).then(function(center) {
        console.log(center);
      }, function (error) {
        console.log(error);
      });
    }
  }
})();