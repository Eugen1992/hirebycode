(function () {
  angular.module('showroom').controller('editDeveloperProfileController', EditDeveloperProfileController);

  EditDeveloperProfileController.$inject = ['$scope', 'UserService'];

  function EditDeveloperProfileController ($scope, userService) {
    $scope.autocompleteOptions = {types: ['(cities)']};
    userService.fetchDeveloperDetails().then(function (info) {
      handleUserInfo(info);
    });
    $scope.submit = function () {
      userService.updateDeveloperDetails($scope.info)
        .then(function(userInfo) {
          handleUserInfo(userInfo);
        }, function () {
          $scope.error = true;
        });
    }

    function handleUserInfo (info) {
      $scope.info = info;
      $scope.location = info.city + ', ' + info.country;
    }
  }
})();