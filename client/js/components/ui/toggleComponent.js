(function () {
  angular.module('showroom').component('srToggle', {
    templateUrl: 'client/views/components/ui/toggle.html',
    bindings: {
      label: '<',
      ngModel: '=',
      state: '<',
      errorText: '<',
      ngChange: '&',
      notificationClass: '<',
      onNotificationClose: '&',
      labelClass: '<',
      containerClass: '<',
      toggleClass: '<',
    }
  });
})();