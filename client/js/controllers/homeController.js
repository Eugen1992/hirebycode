HomeController.$inject = ['$scope', 'ReposService', 'AuthService', 'UserLocalService', '$http', '$state'];
angular.module('showroom').controller('HomeController',  HomeController);

function HomeController ($scope, repos, auth, user, $http, $state) {
  repos.getMostRecent().then(function (recentRepos) {
    $scope.repos = recentRepos;
  });
  $scope.import = function () {
    if (user.isLoggedIn()) {
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