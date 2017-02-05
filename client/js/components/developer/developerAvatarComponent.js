(function () {
  angular.module('showroom').component('developerAvatar', {
    templateUrl: 'client/views/components/developerAvatar.html',
    bindings: {
      avatarUrl: '<',
      onSubmit: '&'
    },
    controller: DeveloperAvatarController
  });

  DeveloperAvatarController.$inject = ['UserService'];

  function DeveloperAvatarController (userService) {
    this.clearAvatar = function () {
      this.newAvatar = null;
    }
    this.submit = function () {
      this.onSubmit({avatar: this.newAvatar});
    }
  }
})();