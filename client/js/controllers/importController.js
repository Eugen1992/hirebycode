ImportController.$inject = ['$scope', '$q', '$filter', 'UserService', 'UserReposService', '$http', '$state', '$stateParams'];
angular.module('showroom').controller('ImportController',  ImportController);

function ImportController ($scope, $q, $filter, user, repos, $http, $state, $stateParams) {
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
    $q.all([user.fetchDeveloperDetails(), repos.import($scope.repo)])
    .then(function (responses) {
      var userDetails = responses[0];
      if (userDetails.profileReadyForPublic) {
        $state.go('user-home');
      } else {
        $state.go('edit-developer-profile');
      }
      
    });

  }
}