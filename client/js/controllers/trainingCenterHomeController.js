TrainingCenterHomeController.$inject = ['$scope', '$state', 'UserLocalService', 'TrainingCentersService', 'UserService', 'Upload'];
angular.module('showroom').controller('TrainingCenterHomeController',  TrainingCenterHomeController);

function TrainingCenterHomeController ($scope, $state, user, trainingCenter, userService, upload) {
  $scope.user = user.getUser();
  trainingCenter.getTrainingCenterRepos(user).then(function (requests) {
    $scope.developersRequests = requests;
  });
  $scope.approveRepo = function (repo) {
    trainingCenter.approveRepo(repo._id).then(function (response) {
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