LoginController.$inject = ['$scope', '$state', 'AuthService'];
angular.module('showroom').controller('LoginController',  LoginController);

function LoginController ($scope, $state, auth) {
  $scope.logInAsDeveloper = function () {
    auth.github().then(function (login) {
        $state.go('user-home');
    }, function (err) {
        console.log('error');
    });
  }
}