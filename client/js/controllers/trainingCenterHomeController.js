angular.module('showroom').controller('TrainingCenterHomeController',  TrainingCenterHomeController);

TrainingCenterHomeController.$inject = [
  '$scope', 
  '$state', 
  'UserLocalService', 
  'TrainingCentersService', 
  'UserService', 
  'Upload',
  'Analytics'];
function TrainingCenterHomeController ($scope, $state, user, trainingCenter, userService, upload, analytics) {
  var vm = this;
  vm.profileFormState = 'idle';

  userService.fetchTrainingCenterDetails().then(function(trainingCenter) {
    vm.profile = trainingCenter;
  });
  trainingCenter.getTrainingCenterRepos(user).then(function (repos) {
    $scope.pendingRepos = repos.pending;
    $scope.approvedRepos = repos.approved;
    $scope.declinedRepos = repos.declined;
  });
  $scope.approveRepo = function (repo) {
    trainingCenter.changeRepoStatus(repo, 'approved')
      .then(
        function (response) {}, 
        function (error) {
        console.log(error);
      });
  }
  $scope.disapproveRepo = function (repo) {
    trainingCenter.changeRepoStatus(repo, 'pending').then(function (response) {
    }, function (error) {
      console.log(error);
    });
  }
  $scope.startDecliningRepo = function (repo) {
    repo.isDeclining = true;
  }
  $scope.cancelDecliningRepo = function (repo) {
    repo.isDeclining = false;
  }
  $scope.declineRepo = function (repo) {
    trainingCenter.changeRepoStatus(repo, 'declined').then(function (response) {
    }, function (error) {
      console.log(error);
    });
  }
  $scope.submitDetails = function () {
    vm.profileFormState = 'loading';
    userService.updateTrainingCenterDetails(vm.profile, $scope.newLogo)
      .then(function () {
        analytics.trackEvent('Training Center', 'Edit profile', 'success');
        vm.profileFormState = 'success';
      }, function (error) {
        analytics.trackEvent('Training Center', 'Edit profile', 'error', error.status);
        vm.profileFormState = 'error';
      });
  }
  $scope.clearLogo = function () {
    $scope.newLogo = null;
  }
}