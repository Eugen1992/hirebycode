(function () {
  angular.module('showroom').component('srErrorMessage', {
    templateUrl: 'client/views/components/ui/errorMessage.html',
    bindings: {
      text: '<',
      onClose: '&',
    }
  });
})();