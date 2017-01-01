ImportController.$inject = ['$scope', '$filter', 'UserReposService', '$http', '$state', '$stateParams'];
angular.module('showroom').controller('ImportController',  ImportController);

function ImportController ($scope, $filter, repos, $http, $state, $stateParams) {
  repos.getByProviderId($stateParams.id).then(function (receivedRepo) {
    $scope.repo = receivedRepo;
    $scope.repo.hbcData = {
      languages: [],
      description: '',
      plans: '',
      contactInfo: '',
      trainingCenterRequired: 'none'
    };
  });;
  $scope.submit = function () {
    repos.import($scope.repo).then(function (response) {
      $state.go('user-home');
    });
  }
}