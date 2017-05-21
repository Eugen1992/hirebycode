(function () {
  angular.module('showroom').component('srInput', {
    templateUrl: 'client/views/components/ui/input.html',
    bindings: {
      form: '<',
      name: '<',
      label: '<',
      ngModel: '=',
      ngChange: '&',
      required: '<',
      placeholder: '<',
      ngPattern: '<',
      ngPaste: '&',
      patternError: '<'
    }
  });
})();