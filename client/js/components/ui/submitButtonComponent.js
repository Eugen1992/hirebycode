(function () {
  angular.module('showroom').component('srSubmitButton', {
    templateUrl: 'client/views/components/submitButton.html',
    transclude: true,
    bindings: {
      state: '<',
      successText: '<',
      errorText: '<'
    },
    controller: SubmitButtonController
  });

  function SubmitButtonController () {

  }
})();