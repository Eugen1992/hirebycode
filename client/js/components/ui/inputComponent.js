(function () {
  angular.module('showroom').component('srInput', {
    templateUrl: 'client/views/components/ui/input.html',
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