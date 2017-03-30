(function () {
  angular.module('showroom').component('srTextarea', {
    templateUrl: 'client/views/components/ui/textarea.html',
    bindings: {
      form: '<',
      name: '<',
      label: '<',
      ngModel: '=',
      required: '<',
      placeholder: '<',
      ngPattern: '<',
      patternError: '<'
    }
  });
})();