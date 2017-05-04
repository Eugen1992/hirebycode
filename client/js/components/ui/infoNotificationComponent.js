(function () {
  angular.module('showroom').component('srInfoNotification', {
    templateUrl: 'client/views/components/ui/infoNotification.html',
    bindings: {
      text: '<'
    }
  });
})();