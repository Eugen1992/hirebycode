(function () {
  angular.module('showroom').component('srToggle', {
    templateUrl: 'client/views/components/ui/toggle.html',
    bindings: {
      label: '<',
      ngModel: '=',
      state: '<',
      errorText: '<',
      ngChange: '&',
      notificationClass: '<'
    },
    controller: ToggleController
  });

  function ToggleController () {
    var vm = this;

    vm.hideNotification = function () {
      state = 'idle';
    }
  }
})();