(function () {
  angular.module('showroom').component('srDeveloperList', {
    templateUrl: 'client/views/components/developer/developerList.html',
    bindings: {
      filters: '<'
    },
    controller: DeveloperListController
  });

  DeveloperListController.$inject = ['$q', 'DeveloperService'];

  function DeveloperListController ($q, developerService) {
    var vm = this;
    var ITEMS_PER_PAGE = 10;
    var shownDevelopersAmount = 0;
    var canceller = $q.defer();;

    vm.$onInit = function () {
      vm.fetch();
    }
    vm.$onChanges = function (changeObject) {
      if (changeObject.filters) {
        vm.fetch();
      }
    }
    vm.fetch = function () {
      canceller.resolve();
      canceller = $q.defer();
      vm.state = 'loading';
      developerService.getActiveDevelopers(vm.filters, canceller).then(function (developers) {
        vm.state = 'success';
        console.log('received');
        vm.developers = developers.slice();
        vm.showAmountOfDevelopers(ITEMS_PER_PAGE);
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