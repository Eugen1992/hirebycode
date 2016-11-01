UserHomeController.$inject = ['$scope', 'ReposService', '$http', '$state'];
angular.module('showroom').controller('UserHomeController',  UserHomeController);

function UserHomeController ($scope, repos, $http, $state) {
  $scope.searchedUser = $state.params.login;
  getRepos();
  $scope.import = function (repo) {
    $state.go('importing', {id: repo.id, name: repo.name, data: repo});
  }
  $scope.deleteRepo = function (repoToDelete) {
    repos.delete({_id: repoToDelete._id})
      .then(function () {
        getRepos();
      },
      function () {
      
    });
  } 
  function getRepos() {
    repos.getUserRepos()
      .then(function (repos) {
        $scope.userRepos = repos;
        $scope.userFound = true;
      }, function () {
        $scope.userFound = false;
      });
  }
}