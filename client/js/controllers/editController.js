EditController.$inject = ['$scope', '$element', '$state', '$stateParams', 'repo', 'SkillsService', 'UserReposService'];
angular.module('showroom').controller('EditController', EditController);

function EditController ($scope, $element, $state, $stateParams, repo, skills, repos) {
  var vm = this;
  vm.repo = repo;

  vm.state = 'idle';
  vm.submit = function () {
    vm.state = 'loading';
    repos.update(vm.repo).then(function () {
      vm.state = 'success';
    }, function () {
      vm.state = 'error';
    });
  }
  vm.switchToPreview = function () {
    $state.go('edit-preview', {id: vm.repo.hbcId});
  }
  vm.switchToEdit = function () {
    $state.go('edit', {id: vm.repo.hbcId});
  }
}