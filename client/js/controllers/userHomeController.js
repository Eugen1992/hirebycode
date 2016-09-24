UserHomeController.$inject = ['$scope', 'ReposService', '$http', '$state'];
angular.module('showroom').controller('UserHomeController',  UserHomeController);

function UserHomeController ($scope, repos, $http, $state) {
  $scope.searchedUser = $state.params.login;
  getRepos();

  $scope.import = function (repo) {
    repos.import($scope.searchedUser, repo.name)
      .then(function (response) {
        repo._id = response.data._id;
        repo.imported = true;
      }, function () { 
        //todo handle error
      });
  }
  $scope.deleteRepo = function (repoToDelete) {
    repos.delete({_id: repoToDelete._id})
      .then(function () {
        $scope.userRepos = repos.getCurrentRepos();
      },
      function () {
      
    });
  }
  function getRepos() {
    repos.getUserRepos()
      .then(function (repos) {
        $scope.userRepos = repos.data;
        $scope.userFound = true;
      }, function () {
        $scope.userFound = false;
      });
  }
}