(function () {
  angular.module('showroom').component('developerAvatar', {
    templateUrl: 'client/views/components/developerAvatar.html',
    bindings: {
      avatarUrl: '<',
      onSubmit: '&',
      state: '<'
    },
    controller: DeveloperAvatarController
  });

  function DeveloperAvatarController () {
    this.clearAvatar = function () {
      this.newAvatar = null;
    }
    this.submit = function () {
      this.onSubmit({avatar: this.newAvatar});
    }
  }
})();