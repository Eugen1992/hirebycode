(function () {
  angular.module('showroom').controller('editDeveloperProfileController', EditDeveloperProfileController);

  EditDeveloperProfileController.$inject = ['$scope', 'UserService'];

  function EditDeveloperProfileController ($scope, userService) {
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
          vm.state = 'success';
          handleUserInfo(userInfo);
        }, function () {
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