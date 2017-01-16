HomeController.$inject = ['$scope', 'DeveloperService', 'AuthService', 'UserLocalService', '$http', '$state'];
angular.module('showroom').controller('HomeController',  HomeController);

function HomeController ($scope, developers, auth, userLocal, $http, $state) {
  developers.getActiveDevelopers().then(function (developers) {
    $scope.developers = developers;
  });
  $scope.import = function () {
    if (userLocal.isLoggedIn()) {
      $state.go('user-home');
    } else {
      auth.github().then(function () {
          $state.go('user-home');
        },
        function (err) {
          console.log('error');
      });
    }
  }
}