TrainingCenterController.$inject = ['$scope', 'trainingCenter'];
angular.module('showroom').controller('TrainingCenterController', TrainingCenterController);

function TrainingCenterController ($scope, trainingCenter) {
  var vm = this;

  vm.trainingCenter = trainingCenter;
  vm.predefinedFilters = {
    school: trainingCenter
  };
  vm.hiddenFilters = {
    school: true
  };
}
