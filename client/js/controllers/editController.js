EditController.$inject = ['$scope', '$element', '$state', '$stateParams', 'repo', 'SkillsService', 'UserReposService'];
angular.module('showroom').controller('EditController', EditController);

function EditController ($scope, $element, $state, $stateParams, repo, skills, repos) {
  $scope.currentPath = '';
  $scope.isLoading = true;
  $scope.repo = repo;
  $scope.isLoading = false;

  $scope.submit = function () {
    repos.update($scope.repo);
  }
  $scope.switchToPreview = function () {
    $state.go('edit-preview', {id: repo.hbcId});
  }
  $scope.switchToEdit = function () {
    $state.go('edit', {id: repo.hbcId});
  }
}