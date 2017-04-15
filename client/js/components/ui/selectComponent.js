(function () {
  angular.module('showroom').component('srSelect', {
    templateUrl: 'client/views/components/ui/select.html',
    bindings: {
      form: '<',
      name: '<',
      label: '<',
      ngModel: '=',
      required: '<',
      options: '<',
      value: '<',
      defaultValue: '<',
      defaultText: '<',
      displayField: '<',
      valueField: '<',
    }
  });
})();