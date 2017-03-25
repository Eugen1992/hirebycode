RepoDetailsController.$inject = ['$scope', '$state', 'repo'];
angular.module('showroom').controller('RepoDetailsController', RepoDetailsController);

function RepoDetailsController ($scope, $state, repo) {
  $scope.repo = repo;
}
