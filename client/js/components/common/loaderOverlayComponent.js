(function () {
  angular.module('showroom').component('srLoaderOverlay', {
    templateUrl: 'client/views/components/common/loaderOverlay.html',
    controller: LoaderOverlayController,
  });
  LoaderOverlayController.$inject = ['$rootScope'];
  function LoaderOverlayController ($rootScope) {
    var vm = this;
    $rootScope.$on('$stateChangeStart', function () {
      vm.shown = true;
    });
    $rootScope.$on('$stateNotFound', function () {
      vm.shown = false;
    });
    $rootScope.$on('$stateChangeError', function () {
      vm.shown = false;
    });
    $rootScope.$on('$stateChangeSuccess', function () {
      vm.shown = false;
    });
  }
  
})();