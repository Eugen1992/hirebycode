LoginController.$inject = ['$scope', '$state', 'AuthService'];
angular.module('showroom').controller('LoginController',  LoginController);

function LoginController ($scope, $state, auth) {
  $scope.logInAsDeveloper = function () {
    auth.github().then(function (login) {
        $state.go('edit-developer-profile');
    }, function (err) {
        console.log(err);
    });
  }
}