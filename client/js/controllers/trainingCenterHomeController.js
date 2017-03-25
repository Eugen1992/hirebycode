angular.module('showroom').controller('TrainingCenterHomeController',  TrainingCenterHomeController);

TrainingCenterHomeController.$inject = ['$scope', '$state', 'UserLocalService', 'TrainingCentersService', 'UserService', 'Upload'];
function TrainingCenterHomeController ($scope, $state, user, trainingCenter, userService, upload) {
  var vm = this;
  vm.profileFormState = 'idle';

  userService.fetchTrainingCenterDetails().then(function(trainingCenter) {
    vm.profile = trainingCenter;
  });
  trainingCenter.getTrainingCenterRepos(user).then(function (repos) {
    $scope.pendingRepos = repos.pending;
    $scope.approvedRepos = repos.approved;
  });
  $scope.approveRepo = function (repo) {
    trainingCenter.approveRepo(repo)
      .then(
        function (response) {}, 
        function (error) {
        console.log(error);
      });
  }
  $scope.disapproveRepo = function (repo) {
    trainingCenter.disapproveRepo(repo).then(function (response) {
    }, function (error) {
      console.log(error);
    });
  }
  $scope.submitDetails = function () {
    vm.profileFormState = 'loading';
    userService.updateTrainingCenterDetails(vm.profile, $scope.newLogo)
      .then(function () {
        vm.profileFormState = 'success';
      }, function () {
        vm.profileFormState = 'error';
      });
  }
  $scope.clearLogo = function () {
    $scope.newLogo = null;
  }
}