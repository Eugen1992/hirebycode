HomeController.$inject = ['$scope', 'ReposService', 'AuthService', '$http', '$state'];
angular.module('showroom').controller('HomeController',  HomeController);

function HomeController ($scope, repos, auth, $http, $state) {
  $scope.import = function () {
    auth.github().then(function (login) {
        $state.go('user-home');
    }, function (err) {
        console.log('error');
    });
  }
}