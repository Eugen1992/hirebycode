ImportController.$inject = ['$scope', '$filter', 'ReposService', '$http', '$state', '$stateParams'];
angular.module('showroom').controller('ImportController',  ImportController);

function ImportController ($scope, $filter, repos, $http, $state, $stateParams) {
  $scope.newRepo = {
    description: 'Some description'
  };
  
  $scope.skills = [
    {
      name: 'Javascript',
      picked: false
    },
    {
      name: 'Angular',
      picked: false
    },
    {
      name: 'CSS',
      picked: false
    }
  ];
  repos.getByProviderId($stateParams.id).then(function (receivedRepo) {
    $scope.repo = receivedRepo;
    $scope.newRepo.name = receivedRepo.name;
  });;
  $scope.submit = function () {
    pickedSkills = $filter('filter')($scope.skills, {picked: true}, true).map(function(skill) {
      return skill.name;
    });
    $scope.newRepo.skills = pickedSkills;
    repos.import($scope.newRepo).then(function () {
      $state.go('user-home');
    });
  }
}