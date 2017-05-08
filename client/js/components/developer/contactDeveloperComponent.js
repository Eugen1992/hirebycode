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
  ContactDeveloperController.$inject = ['ConfigService', 'DeveloperService'];

  function ContactDeveloperController (configService, developerService) {
    var vm = this;

    vm.captchaKey = configService.googleCaptchaKey;
    vm.requestState = 'idle';
    this.showCaptcha = function () {
      if (vm.contacts) {
        return;
      }
      vm.requestState = 'captchaInProgress';
    }
    vm.requestContact = function (captcha) {
      vm.requestState = 'loading';
      developerService.getContactsById(vm.developerId, captcha)
        .then(function (contacts) {
          vm.contacts = contacts;
          vm.requestState = 'idle';
        }, function (error) {
          vm.requestError = error.data;
          vm.requestState = 'idle';
        });
    }
  }
})();