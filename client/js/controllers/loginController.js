LoginController.$inject = ['$scope', '$state', 'AuthService'];
angular.module('showroom').controller('LoginController',  LoginController);

function LoginController ($scope, $state, auth) {
  $scope.logInAsDeveloper = function () {
    auth.github().then(function (user) {
        if (user.isNewUser) {
          $state.go('edit-developer-profile');
        } else {
          $state.go('user-home');
        }
        
    }, function (err) {
        console.log(err);
    });
  }
}