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
      developerService.getActiveDevelopers().then(function (developers) {
        vm.developers = developers;
      });
    }
  }
})();