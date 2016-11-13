EditController.$inject = ['$scope', 'orderByFilter', '$state', '$stateParams', 'ReposService', 'GithubRepoService'];
angular.module('showroom').controller('EditController', EditController);

function EditController ($scope, orderBy, $state, $stateParams, repos, github) {
  $scope.isLoading = true;
  repos.getRepoByHbcId($stateParams.id).then(function (repo) {
    $scope.repo = repo;
    $scope.isLoading = false;
    github.getRepoContent(repo).then(function (content) {
      $scope.shownContent = filterByType(content);
      console.log(content);
      $scope.contentType = 'dir';
    });
  });
  function filterByType (content) {
    var filteredContent = orderBy(content, function (item) {
      return item.type === 'dir' ? 0 : 1;
    });

    return filteredContent;
  }

  $scope.showContent = function (type, path) {
    $scope.shownContent;
  }
}