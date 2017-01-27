(function() {
  angular.module('showroom').controller('AdminTrainingCenterDetailsController', AdminTrainingCenterDetailsController);

  AdminTrainingCenterDetailsController.$inject = ['$scope', '$state', 'AdminTrainingCentersService'];
  function AdminTrainingCenterDetailsController ($scope, $state, AdminTrainingCentersService) {
    var vm = this;
    getTrainingCenter();
    getRepos();

    function getTrainingCenter () {
      AdminTrainingCentersService.getTrainingCenterById($state.params.id).then(function (trainingCenter) {
        vm.trainingCenter = trainingCenter;
      });
    }

    function getRepos () {
      AdminTrainingCentersService.getTrainingCenterRepos($state.params.id).then(function (repos) {
        vm.pendingRepos = repos.pending;
        vm.approvedRepos = repos.approved;
      });
    }
  }
})();