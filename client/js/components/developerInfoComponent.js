(function () {
  angular.module('showroom').component('developerInfo', {
    templateUrl: 'client/views/components/developerInfo.html',
    bindings: {
      user: '<'
    },
    controller: DeveloperInfoController
  });

  DeveloperInfoController.$inject = ['UserService'];

  function DeveloperInfoController (userService) {
    this.$onInit = function () {
      userService.fetchDeveloperDetails().then(function (info) {
        this.info = info;
      }.bind(this));
    }
    this.hideAccount = function () {
      userService.updateDeveloperAccountStatus({hidden: true}).then(function(newInfo) {
        this.info = newInfo;
      }.bind(this));
    }
    this.showAccount = function () {
      userService.updateDeveloperAccountStatus({hidden: false}).then(function(newInfo) {
        this.info = newInfo;
      }.bind(this));
    }
  }
})();