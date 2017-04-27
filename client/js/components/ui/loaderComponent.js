(function () {
  angular.module('showroom').component('srLoader', {
    templateUrl: 'client/views/components/ui/loader.html',
    bindings: {
      shown: '<'
    }
  });
})();