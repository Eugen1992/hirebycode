RepoController.$inject = ['$scope', '$state', 'repo'];
angular.module('showroom').controller('RepoController', RepoController);

function RepoController ($scope, $state, repo) {
  $scope.repo = repo;
}
