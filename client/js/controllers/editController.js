EditController.$inject = ['$scope', '$element', 'orderByFilter', '$state', '$stateParams', 'GithubRepoService', 'repo'];
angular.module('showroom').controller('EditController', EditController);

function EditController ($scope, $element, orderBy, $state, $stateParams, github, repo) {
  $scope.currentPath = '';
  $scope.isLoading = true;
  $scope.repo = repo;
  $scope.isLoading = false;
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
  $scope.$watch('contentType', function (newVal, oldVal) {
    if (newVal === 'file') {
      setTimeout(function () {
        console.log($element[0].getElementsByTagName('code'));
        hljs.highlightBlock($element[0].getElementsByTagName('code')[0]);
      }, 1000);
    }
  });
  $scope.showContent = function (contentSource) {
    var contentType = contentSource.type;
    
    github.getContent($scope.repo, contentSource.path).then(function (data) {
      $scope.contentType = contentType;
      if (contentType === 'dir') {
        $scope.dirContent = filterByType(data);  
      } else {
        $scope.fileContent = atob(data.content);
      }
      
      $scope.currentPath += contentSource.path;
    });
  }
  $scope.goUpFolders = function () {
    var pathParts = $scope.currentPath.split('/');
    var path = pathParts.slice(0, pathParts.length - 1).join(''); 
    github.getContent($scope.repo, path).then(function (content) {
      $scope.dirContent = filterByType(content);
      $scope.contentType = 'dir';
      $scope.currentPath = path;
    }); 
  } 
}