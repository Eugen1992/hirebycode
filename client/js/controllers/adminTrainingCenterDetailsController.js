(function() {
  angular.module('showroom').controller('AdminTrainingCenterDetailsController', AdminTrainingCenterDetailsController);

  AdminTrainingCenterDetailsController.$inject = ['$scope', '$state', 'AdminTrainingCentersService'];
  function AdminTrainingCenterDetailsController ($scope, $state, AdminTrainingCentersService) {
    var vm = this;
    getTrainingCenter();

    function getTrainingCenter () {
      AdminTrainingCentersService.getTrainingCenterById($state.params.id).then(function (trainingCenters) {
        vm.trainingCenters = trainingCenters;
      });
    }
  }
})();