EditController.$inject = ['$scope', '$element', '$state', '$stateParams', 'repo', 'SkillsService', 'UserReposService'];
angular.module('showroom').controller('EditController', EditController);

function EditController ($scope, $element, $state, $stateParams, repo, skills, repos) {
  var vm = this;
  $scope.repo = repo;

  vm.state = 'idle';
  $scope.submit = function () {
    vm.state = 'loading';
    repos.update($scope.repo).then(function () {
      vm.state = 'success';
    }, function () {
      vm.state = 'error';
    });
  }
  $scope.switchToPreview = function () {
    $state.go('edit-preview', {id: repo.hbcId});
  }
  $scope.switchToEdit = function () {
    $state.go('edit', {id: repo.hbcId});
  }
}