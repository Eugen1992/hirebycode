(function () {
  angular.module('showroom').component('srSubmitButton', {
    templateUrl: 'client/views/components/submitButton.html',
    transclude: true,
    bindings: {
      state: '<'
    },
    controller: SubmitButtonController
  });

  function SubmitButtonController () {

  }
})();