(function () {
  angular.module('showroom').controller('editDeveloperProfileController', EditDeveloperProfileController);

  EditDeveloperProfileController.$inject = ['$scope', '$state', '$stateParams', 'UserService', 'Analytics'];

  function EditDeveloperProfileController ($scope, $state, $stateParams, userService, analytics) {
    var vm = this;
    vm.state = 'idle';
    vm.isInitial = $stateParams.isInitial;
    vm.hasBackButton = !vm.isInitial;
    vm.headerText = vm.isInitial ? 'Competing registration' : 'Edit profile';
    vm.cancelButtonText = vm.isInitial ? 'I will do this later' : 'Cancel';
    vm.submitButtonText = vm.isInitial ? 'Create profile' : 'Update profile';
    vm.autocompleteOptions = { types: ['(cities)'] };
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