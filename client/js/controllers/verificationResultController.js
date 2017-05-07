(function () {
  VerificationResultController.$inject = ['UserService'];
  angular.module('showroom').controller('VerificationResultController', VerificationResultController);

  function VerificationResultController (userService) {
    var vm = this;
    userService.fetchDeveloperDetails().then(function (user) {
      vm.emailVerificationStatus = user.emailVerificationStatus;
    });
  }
})();
