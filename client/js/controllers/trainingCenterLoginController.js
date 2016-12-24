TrainingCenterLoginController.$inject = ['$scope', '$state', 'AuthService'];
angular.module('showroom').controller('TrainingCenterLoginController',  TrainingCenterLoginController);

function TrainingCenterLoginController ($scope, $state, auth) {
  $scope.submit = function () {
    auth.trainingCenter($scope.login, $scope.password).then(function () {
        $scope.error = null;
        $state.go('account');
    }, function (err) {
        if (err.status === 401) {
          $scope.error = 'Wrong credentials, try again';
        } else {
          $scope.error = 'Something went wrong';
        }
    });
  }
}