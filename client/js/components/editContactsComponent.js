(function () {
  angular.module('showroom').component('srEditContacts', {
    templateUrl: 'client/views/components/editContacts.html',
    bindings: {
      user: '<'
    },
    controller: EditContactsController
  });

  EditContactsController.$inject = ['UserDetailsService'];

  function EditContactsController (userDetails) {
    this.$onInit = function () {
      userDetails.fetchUserDetails().then(function (contacts) {
        this.contacts = contacts;
      }.bind(this));
    }
    this.submit = function () {
      userDetails.updateUserDetails({
        contacts: this.contacts
      });
    }
  }
})();