HeaderController.$inject = ['$scope', '$state', 'UserLocalService', 'AuthService'];
angular.module('showroom').controller('HeaderController', HeaderController);

function HeaderController ($scope, $state, user, auth) {
  $scope.isLoggedIn = user.isLoggedIn();
  $scope.logOut = function () {
    user.logOut();
    $state.go('home');
  }
  $scope.logIn = function () {
    auth.github().then(function (login) {
        $state.go('user-home');
    }, function (err) {
        console.log('error');
    });
  }
  $scope.$watch(function() {
    return user.isLoggedIn();
  }, function () {
    $scope.isLoggedIn = user.isLoggedIn();
  });

}