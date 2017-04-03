(function () {
  angular.module('showroom').component('srDeveloperList', {
    templateUrl: 'client/views/components/developer/developerList.html',
    bindings: {
      filters: '<'
    },
    controller: DeveloperListController
  });

  DeveloperListController.$inject = ['DeveloperService'];

  function DeveloperListController (developerService) {
    var vm = this;
    var ITEMS_PER_PAGE = 10;
    var shownDevelopersAmount = 0;

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
        vm.showAmountOfDevelopers(ITEMS_PER_PAGE);
      }, function () {
        vm.state = 'error';
      });
    }
    vm.loadMore = function () {
      vm.showAmountOfDevelopers(vm.shownDevelopersAmount + ITEMS_PER_PAGE);
    }
    vm.showAmountOfDevelopers = function (amount) {
      if (vm.developers.length <= amount) {
        vm.shownDevelopersAmount = vm.developers.length;
        vm.hasMoreDevelopers = false;
      } else {
        vm.shownDevelopersAmount = amount;
        vm.hasMoreDevelopers = true;
      }
      vm.developersToShow = vm.developers.slice(0, vm.shownDevelopersAmount);
    }
  }
})();