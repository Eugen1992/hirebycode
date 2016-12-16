(function () {
  angular.module('showroom').component('srRepoContacts', {
    templateUrl: 'client/views/components/repoContacts.html',
    bindings: {
      userId: '<'
    },
    controller: RepoContactsController
  });

  RepoContactsController.$inject = ['UserDetailsService']
  function RepoContactsController (userDetails) {
    this.$onInit = function () {
      console.log(this);
      userDetails.getContactsById(this.userId).then(function (contacts) {
        this.contacts = contacts;
      }.bind(this));
    }
  }
})();