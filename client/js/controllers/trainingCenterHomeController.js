TrainingCenterHomeController.$inject = ['$scope', '$state', 'UserLocalService', 'TrainingCentersService', 'Upload'];
angular.module('showroom').controller('TrainingCenterHomeController',  TrainingCenterHomeController);

function TrainingCenterHomeController ($scope, $state, user, trainingCenter, upload) {
  $scope.user = user.getUser();
  trainingCenter.getTrainingCenterRequests(user).then(function (requests) {
    $scope.developersRequests = requests;
  });
  $scope.submitDetails = function () {
    trainingCenter.update($scope.user, $scope.newLogo);
  }
  $scope.clearLogo = function () {
    $scope.newLogo = null;
  }
}