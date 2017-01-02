(function () {
  angular.module('showroom').component('srEditContacts', {
    templateUrl: 'client/views/components/editContacts.html',
    bindings: {
      user: '<'
    },
    controller: EditContactsController
  });

  EditContactsController.$inject = ['UserService'];

  function EditContactsController (userService) {
    this.$onInit = function () {
      userService.fetchDeveloperDetails().then(function (info) {
        this.info = info;
      }.bind(this));
    }
    this.submit = function () {
      userService.updateDeveloperDetails(this.info);
    }
  }
})();