(function () {
  angular.module('showroom').component('srSubmitButton', {
    templateUrl: 'client/views/components/ui/submitButton.html',
    transclude: true,
    bindings: {
      state: '<',
      successText: '<',
      errorText: '<',
      buttonClass: '<',
      notificationPosition: '<',
      hideResult: '<',
    }
  });
})();