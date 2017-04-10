(function () {
  angular.module('showroom').component('srDeveloperAvatar', {
    templateUrl: 'client/views/components/developer/developerAvatar.html',
    bindings: {
      avatarUrl: '<',
      imageClassName: '<',
      iconClassName: '<',
    },
    controller: DeveloperAvatarController
  });
  DeveloperAvatarController.$inject = ['Upload', 'UserService'];

  function DeveloperAvatarController (Upload, userService) {
    var vm = this;

    vm.clearAvatar = function () {
      vm.newAvatar = null;
    }
    vm.submit = function () {
      vm.updateAvatar(Upload.dataUrltoBlob(vm.croppedDataUrl));
    }
    vm.updateAvatar = function (avatar) {
      vm.state = 'loading';
      userService.updateDeveloperAvatar(avatar).then(function() {
        vm.state = 'success';
        vm.newAvatar = null;
        vm.avatarUrl += '?' + new Date().getTime();
      }).catch(function (error) {
        vm.state = 'error';
      });
    }
  }
})();