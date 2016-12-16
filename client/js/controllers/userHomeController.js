UserHomeController.$inject = ['$scope', 'UserReposService', '$http', '$state'];
angular.module('showroom').controller('UserHomeController',  UserHomeController);

function UserHomeController ($scope, repos, $http, $state) {
  $scope.searchedUser = $state.params.login;
  getRepos();
  $scope.import = function (repo) {
    $state.go('importing', {id: repo.id, name: repo.name, data: repo});
  }
  $scope.deleteRepo = function (repoToDelete) {
    repos.delete({hbcId: repoToDelete.hbcId})
      .then(function () {
        getRepos();
      },
      function () {
        
    });
  }
  $scope.editRepo = function (repo) {
    $state.go('edit', {id: repo.hbcId});
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