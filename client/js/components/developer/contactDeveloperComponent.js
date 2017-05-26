(function () {
  angular.module('showroom').component('srContactDeveloper', {
    templateUrl: 'client/views/components/developer/contactDeveloper.html',
    bindings: {
      developerName: '<',
      state: '<',
      developerId: '<',
      isEmailVerified: '<',
    },
    controller: ContactDeveloperController
  });
  ContactDeveloperController.$inject = ['ConfigService', 'DeveloperService', 'Analytics'];

  function ContactDeveloperController (configService, developerService, analyticsProvider) {
    var vm = this;

    vm.captchaKey = configService.googleCaptchaKey;
    vm.requestState = 'idle';
    this.showCaptcha = function () {
      if (vm.contacts) {
        return;
      }
      analyticsProvider.trackEvent('Contacts request', 'captcha', 'started');
      vm.requestState = 'captchaInProgress';
    };
    vm.requestContact = function (captcha) {
      vm.requestState = 'loading';
      analyticsProvider.trackEvent('Contacts request', 'captcha', 'completed');
      developerService.getContactsById(vm.developerId, captcha)
        .then(function (contacts) {
          analyticsProvider.trackEvent('Contacts request', 'received', 'success');
          vm.contacts = contacts;
          vm.requestState = 'idle';
        }, function (error) {
          analyticsProvider.trackEvent('Contacts request', 'received', 'error');
          vm.requestError = error.data;
          vm.requestState = 'idle';
        });
    };
  }
})();