(function () {
  angular.module('showroom').component('srEmailVerification', {
    templateUrl: 'client/views/components/common/emailVerification.html',
    bindings: {
      hideEmail: '<'
    },
    controller: EmailVerficationController
  });

  EmailVerficationController.$inject = ['UserService'];

  function EmailVerficationController (userService) {
    var vm = this;
    vm.$onInit = function () {
      userService.fetchDeveloperDetails()
        .then(function (user) {
          vm.user = user;
        });
    }
    vm.startEmailVerification = function () {
      vm.user.emailVerificationStatus = 'sending';
      userService.startEmailVerification()
      .then(function (emailVerificationStatus) {
        vm.notificationStatus = emailVerificationStatus === 'sent' ? 'success': 'error';
      },
      function (emailVerificationStatus) {
        vm.notificationStatus = 'error';
      });
    }
    vm.onNotificationClose = function () {
      vm.notificationStatus = 'hidden';
    }

    vm.buttonTexts = {
      'sent': 'Resend',
      'sending': 'Sending...',
      'sent-error': 'Verify',
      'non-verified': 'Verify',
    };
  }
})();