(function() {
  angular.module('showroom').controller('AdminTrainingCentersController', AdminTrainingCentersController);

  AdminTrainingCentersController.$inject = ['$scope', 'AdminTrainingCentersService'];
  function AdminTrainingCentersController ($scope, AdminTrainingCentersService) {
    var vm = this;
    getTrainingCenters();
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
    function getTrainingCenters () {
      AdminTrainingCentersService.getTrainingCenters().then(function (trainingCenters) {
        vm.trainingCenters = trainingCenters;
      });
    }
  }
})();