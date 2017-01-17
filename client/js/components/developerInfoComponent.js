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
  }
})();