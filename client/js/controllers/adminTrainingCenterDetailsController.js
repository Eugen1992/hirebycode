(function() {
  angular.module('showroom').controller('AdminTrainingCenterDetailsController', AdminTrainingCenterDetailsController);

  AdminTrainingCenterDetailsController.$inject = ['$scope', 'AdminTrainingCentersService'];
  function AdminTrainingCenterDetailsController ($scope, AdminTrainingCentersService) {
    var vm = this;
    gettrainingCenters();
    vm.addTrainingCenter = function() {
      AdminTrainingCentersService.createTrainingCenter(
        vm.newTrainingCenter.password,
        vm.newTrainingCenter.login,
        vm.newTrainingCenter.name);
    }
    vm.removeTrainingCenter = function(trainingCenter) {
      AdminTrainingCentersService.removeTrainingCenter(trainingCenter).then(function (trainingCenters) {
        vm.trainingCenters = trainingCenters;
      });
    }
    function gettrainingCenters () {
      AdminTrainingCentersService.getTrainingCenters().then(function (trainingCenters) {
        vm.trainingCenters = trainingCenters;
      });
    }
  }
})();