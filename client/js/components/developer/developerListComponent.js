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
      developerService.getActiveDevelopers(vm.filters).then(function (developers) {
        vm.developers = developers;
      });
    }
    vm.$onChanges = function (changeObject) {
      if (changeObject.filters) {
        developerService.getActiveDevelopers(vm.filters).then(function (developers) {
          vm.developers = developers;
        });
      }
    }
  }
})();