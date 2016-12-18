TrainingCenterHomeController.$inject = ['$scope', '$state', 'UserService'];
angular.module('showroom').controller('TrainingCenterHomeController',  TrainingCenterHomeController);

function TrainingCenterHomeController ($scope, $state, user) {
  console.log(user.getUser());
}