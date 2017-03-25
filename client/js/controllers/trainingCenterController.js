TrainingCenterController.$inject = ['$scope', 'developers', 'trainingCenter'];
angular.module('showroom').controller('TrainingCenterController', TrainingCenterController);

function TrainingCenterController ($scope, developers, trainingCenter) {
  var vm = this;

  vm.trainingCenter = trainingCenter;
  vm.developers = developers;
}
