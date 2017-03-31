TrainingCenterLoginController.$inject = ['$scope', '$state', 'AuthService', 'Analytics'];
angular.module('showroom').controller('TrainingCenterLoginController',  TrainingCenterLoginController);

function TrainingCenterLoginController ($scope, $state, auth, analytics) {
  $scope.submit = function () {
    auth.trainingCenter($scope.login, $scope.password).then(function () {
        analytics.trackEvent('Training Center', 'Login', 'Success');
        $scope.error = null;
        $state.go('account');
    }, function (err) {
      console.log('error');
        if (err.status === 401) {
          analytics.trackEvent('Training Center', 'Login', 'Error/credentials');
          $scope.error = 'Wrong credentials, try again';
        } else {
          analytics.trackEvent('Training Center', 'Login', 'Error/unknown', err.status);
          $scope.error = 'Something went wrong';
        }
    });
  }
}