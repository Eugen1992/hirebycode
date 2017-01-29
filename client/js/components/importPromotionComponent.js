(function () {
  angular.module('showroom').component('srImportPromotion', {
    templateUrl: 'client/views/components/importPromotion.html',
    controller: ImportPromotionController
  });

  ImportPromotionController.$inject = ['$state', 'AuthService', 'UserLocalService']
  function ImportPromotionController ($state, auth, userLocal) {
    var vm = this;

    vm.import = function () {
      if (userLocal.isDeveloper()) {
        $state.go('user-home');
      } else {
        auth.github().then(function () {
            $state.go('user-home');
          },
          function (err) {
            console.log('error');
        });
      }
    }
  }
})();