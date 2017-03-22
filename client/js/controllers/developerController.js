(function () {
  angular.module('showroom').controller('DeveloperController', DeveloperController);
  DeveloperController.$inject = ['$scope', 'developer', 'DeveloperService', 'ConfigService', 'AnalyticService'];
  function DeveloperController (scope, developer, developerService, configService, analyticService) {
    analyticService.sendEvent({ email: 'someEmail' });
    var vm = this;
    vm.repos = developer.repos;
    vm.developer = developer.info;
    vm.contactRequestState = 'idle';
    vm.captchaKey = configService.googleCaptchaKey;

    vm.showCaptcha = function () {
      if (vm.contacts) {
        return;
      }
      vm.contactRequestState = 'captchaInProgress';
    };
    vm.requestContact = function (captcha) {
      vm.contactRequestState = 'loading';
      developerService.getContactsById(vm.developer._id, captcha)
        .then(function (contacts) {
          vm.contacts = contacts;
          vm.contactRequestState = 'idle';
        }, function (error) {
          vm.contactRequestError = error.data;
          vm.contactRequestState = 'idle';
        });
    }
  }
})();