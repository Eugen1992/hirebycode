(function () {
  angular.module('showroom').component('srRepoContacts', {
    templateUrl: 'client/views/components/repoContacts.html',
    bindings: {
      userId: '<'
    },
    controller: RepoContactsController
  });

  RepoContactsController.$inject = ['UserService']
  function RepoContactsController (userService) {
    this.$onInit = function () {
      userService.getContactsById(this.userId).then(function (contacts) {
        this.contacts = contacts;
      }.bind(this));
    }
    this.toggleContacts = function () {
      this.contactsShown = !this.contactsShown;
    }
  }
})();