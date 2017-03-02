(function () {
  angular.module('showroom').component('srDeveloperList', {
    templateUrl: 'client/views/components/developerList.html',
    bindings: {
      filters: '<'
    },
    controller: DeveloperListController
  });

  DeveloperListController.$inject = ['DeveloperService'];

  function DeveloperListController (developerService) {
    var vm = this;

    vm.$onInit = function () {
      vm.fetch();
      vm.state = 'loading';
    }
    vm.$onChanges = function (changeObject) {
      if (changeObject.filters) {
        vm.fetch();
      }
    }
    vm.fetch = function () {
      vm.state = 'loading';
      developerService.getActiveDevelopers(vm.filters).then(function (developers) {
        vm.state = 'idle';
        vm.developers = developers;
      }, function () {
        vm.state = 'error';
      });
    }
  }
})();