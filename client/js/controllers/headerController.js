HeaderController.$inject = ['$scope', '$state', 'UserService'];
angular.module('showroom').controller('HeaderController', HeaderController);

function HeaderController ($scope, $state, user) {
  $scope.isLoggedIn = user.isLoggedIn();
  $scope.logOut = function () {
    user.logOut();
    $state.go('home');
  }
  $scope.$watch(function() {
    return user.isLoggedIn();
  }, function () {
    $scope.isLoggedIn = user.isLoggedIn();
  });
}