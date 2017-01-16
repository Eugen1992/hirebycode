(function () {
  angular.module('showroom').component('srEditProfile', {
    templateUrl: 'client/views/components/editProfile.html',
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
      userService.updateDeveloperDetails(this.info, this.newAvatar);
    }
    this.clearAvatar = function () {
      this.newAvatar = null;
    }
  }
})();