TrainingCenterHomeController.$inject = ['$scope', '$state', 'UserService', 'TrainingCenterService'];
angular.module('showroom').controller('TrainingCenterHomeController',  TrainingCenterHomeController);

function TrainingCenterHomeController ($scope, $state, user, trainingCenter) {
  $scope.user = user.getUser();
  $scope.submitDetails = function () {
    trainingCenter.updateDetails($scope.user);
  }
}