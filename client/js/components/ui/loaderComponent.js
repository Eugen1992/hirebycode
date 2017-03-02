(function () {
  angular.module('showroom').component('srLoader', {
    templateUrl: 'client/views/components/loader.html',
    bindings: {
      shown: '<'
    },
    controller: LoaderController
  });

  function LoaderController () {

  }
})();