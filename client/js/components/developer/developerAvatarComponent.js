(function () {
  angular.module('showroom').component('developerAvatar', {
    templateUrl: 'client/views/components/developer/developerAvatar.html',
    bindings: {
      avatarUrl: '<',
      onSubmit: '&',
      state: '<'
    },
    controller: DeveloperAvatarController
  });
  DeveloperAvatarController.$inject = ['Upload'];

  function DeveloperAvatarController (Upload) {
    this.clearAvatar = function () {
      this.newAvatar = null;
    }
    this.submit = function () {
      this.onSubmit({avatar: Upload.dataUrltoBlob(this.croppedDataUrl)});
    }
  }
})();