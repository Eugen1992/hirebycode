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
      userService.fetchDeveloperDetails().then(function (contacts) {
        this.contacts = contacts;
      }.bind(this));
    }
    this.submit = function () {
      userService.updateDeveloperDetails({
        contacts: this.contacts
      });
    }
  }
})();