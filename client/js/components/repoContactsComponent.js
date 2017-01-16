(function () {
  angular.module('showroom').component('srRepoContacts', {
    templateUrl: 'client/views/components/repoContacts.html',
    bindings: {
      userId: '<'
    },
    controller: RepoContactsController
  });

  RepoContactsController.$inject = ['DeveloperService']
  function RepoContactsController (developerService) {
    this.$onInit = function () {
      developerService.getContactsById(this.userId).then(function (contacts) {
        this.contacts = contacts;
      }.bind(this));
    }
    this.toggleContacts = function () {
      this.contactsShown = !this.contactsShown;
    }
  }
})();