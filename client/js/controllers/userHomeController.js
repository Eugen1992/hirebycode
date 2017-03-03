UserHomeController.$inject = ['$scope', 'UserReposService', '$filter', '$http', '$state'];
angular.module('showroom').controller('UserHomeController',  UserHomeController);

function UserHomeController ($scope, userRepos, filter, $http, $state) {
  $scope.searchedUser = $state.params.login;
  $scope.reposState = 'loading';
  getRepos();
  $scope.import = function (repo) {
    $state.go('importing', {id: repo.id, name: repo.name, data: repo});
  }
  $scope.deleteRepo = function (repoToDelete) {
    userRepos.delete({hbcId: repoToDelete.hbcId})
      .then(function () {
        getRepos();
      });
  }
  $scope.hideRepo = function (repoToHide) {
    userRepos.hide({hbcId: repoToHide.hbcId})
      .then(function () {
        getRepos();
      });
  }
  $scope.unhideRepo = function (repoToHide) {
    userRepos.unhide({hbcId: repoToHide.hbcId})
      .then(function () {
        getRepos();
      });
  }
  $scope.editRepo = function (repo) {
    $state.go('edit', {id: repo.hbcId});
  }
  
  function getRepos() {
    userRepos.getUserRepos()
      .then(function (repos) {
        handleRepos(repos);
        $scope.reposState = 'loaded';
      }, function () {
        $scope.reposState = 'failed';
      });
  }
  function handleRepos(repos) {
    $scope.userGithubRepos = repos.filter(function(repo) {
      return !repo.imported;
    });
    $scope.userImportedRepos = repos.filter(function(repo) {
      return repo.imported;
    });
  }
}