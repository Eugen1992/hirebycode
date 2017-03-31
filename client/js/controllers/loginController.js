LoginController.$inject = ['$scope', '$state', 'AuthService', 'Analytics'];
angular.module('showroom').controller('LoginController',  LoginController);

function LoginController ($scope, $state, auth, analytics) {
  $scope.logInAsDeveloper = function () {
    analytics.trackEvent('Developer', 'Login', 'start');
    auth.github().then(function (user) {
        if (user.isNewUser) {
          analytics.trackEvent('Developer', 'Signup', 'success');
          $state.go('edit-developer-profile');
        } else {
          analytics.trackEvent('Developer', 'Login', 'success');
          $state.go('user-home');
        }
        
    }, function (err) {
        analytics.trackEvent('Developer', 'Login', 'error', err.status);
        console.log(err);
    });
  }
}