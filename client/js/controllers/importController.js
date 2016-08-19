ImportController.$inject = ['$scope', 'ReposService', '$http'];
angular.module('showroom').controller('ImportController',  ImportController);

function ImportController ($scope, repos, $http) {
  $scope.searchedUser = "Eugen1992";
  repos.getImported()
    .then(function (repos) {
      $scope.importedRepos = repos.data;
    }, function () {
      console.log('error');
    });
  $scope.search = function () {
    repos.search($scope.searchedUser, $http)
      .then(function (repos) {
        $scope.userRepos = repos.data;
        $scope.userFound = true;
      }, function () {
        $scope.userFound = false;
      });
  }
  $scope.import = function (repo) {
    repos.import($scope.searchedUser, repo.name)
      .then(function () {
        repo.imported = true;
      }, function () { 
        //todo handle error
      });
  }
  $scope.deleteRepo = function (repoToDelete) {
    $scope.importedRepos[repoToDelete._id].isDeleting = true;
    repos.delete(repoToDelete._id)
      .then(function () {
        delete $scope.importedRepos[repoToDelete._id]
      },
      function () {
      
    });
  }
}