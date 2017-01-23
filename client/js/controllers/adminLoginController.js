(function () {
  angular.module('showroom').controller('AdminLoginController', AdminLoginController);

  AdminLoginController.$inject = ['$scope', '$state', 'AuthService'];

  function AdminLoginController ($scope, $state, authService) {
    $scope.submit = function () {
      authService.admin($scope.login, $scope.password).then(function () {
        $state.go('admin-panel');
      }, function () {
        $scope.error = true; 
      });
    }
  }
})();