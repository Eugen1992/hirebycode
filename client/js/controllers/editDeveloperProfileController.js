(function () {
  angular.module('showroom').controller('editDeveloperProfileController', EditDeveloperProfileController);

  EditDeveloperProfileController.$inject = ['$scope', '$state', 'UserService', 'Analytics'];

  function EditDeveloperProfileController ($scope, $state, userService, analytics) {
    var vm = this;
    vm.state = 'idle';
    vm.autocompleteOptions = {types: ['(cities)']};
    userService.fetchDeveloperDetails().then(function (info) {
      handleUserInfo(info);
    });
    vm.submit = function () {
      if (!vm.form.$valid) {
        return;
      }
      vm.state = 'loading';
      userService.updateDeveloperDetails(vm.info)
        .then(function(userInfo) {
          analytics.trackEvent('Developer', 'Edit profile', 'success');
          $state.go('user-home');
          vm.state = 'success';
          handleUserInfo(userInfo);
        }, function (error) {
          analytics.trackEvent('Developer', 'Edit profile', 'error', error.status);
          vm.state = 'error';
          vm.error = true;
        });
    }

    function handleUserInfo (info) {
      var hasLocation = info.city && info.country;
      vm.info = info;

      vm.location = hasLocation ? (info.city + ', ' + info.country) : null;
    }
  }
})();