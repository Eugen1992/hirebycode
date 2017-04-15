EditController.$inject = ['$scope', '$element', '$state', '$stateParams', 'repo', 'SkillsService', 'UserReposService'];
angular.module('showroom').controller('EditController', EditController);

function EditController ($scope, $element, $state, $stateParams, repo, skills, repos) {
  var vm = this;
  vm.repo = repo;
  vm.repoState = 'repoLoaded';
  vm.submitState = 'idle';
  vm.submit = function () {
    vm.submitState = 'loading';
    repos.update(vm.repo).then(function () {
      vm.submitState = 'success';
    }, function () {
      vm.submitState = 'error';
    });
  }
  vm.switchToPreview = function () {
    $state.go('edit-preview', {id: vm.repo.hbcId});
  }
  vm.switchToEdit = function () {
    $state.go('edit', {id: vm.repo.hbcId});
  }
}