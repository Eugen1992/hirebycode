RepoDetailsController.$inject = ['$scope', '$state', 'repo', 'GithubRepoService', 'orderByFilter'];
angular.module('showroom').controller('RepoDetailsController', RepoDetailsController);

function RepoDetailsController ($scope, $state, repo, github, orderBy) {
  $scope.repo = repo;

  github.getRepoContent(repo).then(function (content) {
    $scope.dirContent = filterByType(content);
    $scope.contentType = 'dir';
  });
  function filterByType (content) {
    var filteredContent = orderBy(content, function (item) {
      return item.type === 'dir' ? 0 : 1;
    });

    return filteredContent;
  }
  $scope.showContent = function (contentSource) {
    var contentType = contentSource.type;
    
    github.getContent($scope.repo, contentSource.path).then(function (data) {
      if (contentType === 'dir') {
        $scope.dirContent = filterByType(data);
      } else {
        $scope.fileContent = atob(data.content);
        $scope.fileType = data.name.split('.').pop();
      }
      $scope.contentType = contentType;
      $scope.currentPath = contentSource.path;
    });
  }
  $scope.goUpFolders = function () {
    var pathParts = $scope.currentPath.split('/');
    var path = pathParts.slice(0, pathParts.length - 1).join('/'); 
    github.getContent($scope.repo, path).then(function (content) {
      $scope.dirContent = filterByType(content);
      $scope.contentType = 'dir';
      $scope.currentPath = path;
    }); 
  }
}