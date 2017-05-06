(function () {
  angular.module('showroom').component('srEmailVerification', {
    templateUrl: 'client/views/components/common/emailVerification.html',
    controller: EmailVerficationController
  });

  EmailVerficationController.$inject = ['UserService'];

  function EmailVerficationController (userService) {
    var vm = this;
    vm.$onInit = function () {
      userService.fetchDeveloperDetails()
        .then((user) => {
          vm.user = user;
        });
    }
    vm.startEmailVerification = function () {
      userService.startEmailVerification()
      .then(function () {
        
      })
      .catch(function () {
        vm.accountShown = !vm.accountShown;
        vm.accountToggleState = 'error';
      });
    }
  }
})();