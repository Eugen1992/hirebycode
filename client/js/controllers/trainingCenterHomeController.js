TrainingCenterHomeController.$inject = ['$scope', '$state', 'UserLocalService', 'TrainingCentersService', 'UserService', 'Upload'];
angular.module('showroom').controller('TrainingCenterHomeController',  TrainingCenterHomeController);

function TrainingCenterHomeController ($scope, $state, user, trainingCenter, userService, upload) {
  $scope.user = user.getUser();
  trainingCenter.getTrainingCenterRepos(user).then(function (repos) {
    $scope.pendingRepos = repos.pending;
    $scope.approvedRepos = repos.approved;
  });
  $scope.approveRepo = function (repo) {
    trainingCenter.approveRepo(repo).then(function (response) {
    }, function (error) {
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
    userService.updateTrainingCenterDetails($scope.user, $scope.newLogo);
  }
  $scope.clearLogo = function () {
    $scope.newLogo = null;
  }
}