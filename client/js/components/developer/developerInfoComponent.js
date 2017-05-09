(function () {
  angular.module('showroom').component('developerInfo', {
    templateUrl: 'client/views/components/developer/developerInfo.html',
    bindings: {
      user: '<'
    },
    controller: DeveloperInfoController
  });

  DeveloperInfoController.$inject = ['UserService'];

  function DeveloperInfoController (userService) {
    var vm = this;
    vm.$onInit = function () {
      vm.avatarState = 'idle';
      userService.fetchDeveloperDetails().then(function (info) {
        vm.info = info;
        vm.accountShown = !info.hidden;
      });
    }
    vm.handleStatusChange = function () {
      var newHiddenValue = vm.accountShown;
      userService.updateDeveloperAccountStatus({ hidden: newHiddenValue })
      .catch(function () {
        vm.accountShown = !vm.accountShown;
        vm.accountToggleState = 'error';
      });
    }
    vm.hideStatusChangeNotification = function () {
      vm.accountToggleState = 'idle';
    }
  }
})();