(function () {
  angular.module('showroom').component('srSubmitButton', {
    templateUrl: 'client/views/components/submitButton.html',
    transclude: true,
    bindings: {
      state: '<',
      successText: '<',
      errorText: '<',
      buttonClass: '<',
      notificationPosition: '<'
    },
    controller: SubmitButtonController
  });

  function SubmitButtonController () {

  }
})();