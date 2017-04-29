angular.module('showroom').controller('TrainingCenterHomeController',  TrainingCenterHomeController);

TrainingCenterHomeController.$inject = [
  '$state', 
  'UserLocalService', 
  'TrainingCentersService', 
  'UserService', 
  'Upload',
  'Analytics'];
function TrainingCenterHomeController ($state, user, trainingCenter, userService, upload, analytics) {
  var vm = this;
  vm.profileFormState = 'idle';

  userService.fetchTrainingCenterDetails().then(function(trainingCenter) {
    vm.profile = trainingCenter;
  });
  trainingCenter.getTrainingCenterRepos(user).then(function (repos) {
    vm.pendingRepos = repos.pending;
    vm.approvedRepos = repos.approved;
    vm.declinedRepos = repos.declined;
  });
  vm.approveRepo = function (repo) {
    trainingCenter.changeRepoStatus(repo, 'approved')
      .then(
        function (response) {}, 
        function (error) {
        console.log(error);
      });
  }
  vm.disapproveRepo = function (repo) {
    trainingCenter.changeRepoStatus(repo, 'pending').then(function (response) {
    }, function (error) {
      console.log(error);
    });
  }
  vm.startDecliningRepo = function (repo) {
    repo.isDeclining = true;
  }
  vm.cancelDecliningRepo = function (repo) {
    repo.isDeclining = false;
  }
  vm.declineRepo = function (repo) {
    trainingCenter.changeRepoStatus(repo, 'declined').then(function (response) {
    }, function (error) {
      console.log(error);
    });
  }
  vm.submitDetails = function () {
    vm.profileFormState = 'loading';
    userService.updateTrainingCenterDetails(vm.profile, vm.newLogo)
      .then(function () {
        analytics.trackEvent('Training Center', 'Edit profile', 'success');
        vm.profileFormState = 'success';
      }, function (error) {
        analytics.trackEvent('Training Center', 'Edit profile', 'error', error.status);
        vm.profileFormState = 'error';
      });
  }
  vm.toggleAccountStatus = function () {
    userService.updateTrainingCenterAccountStatus({ isPublic: !vm.profile.isPublic })
      .catch(function (error) {
        vm.profile.isPublic = !vm.profile.isPublic;
        vm.accountToggleState = 'error';
      });
  }
  vm.hideAccountStatusNotification = function () {
    vm.accountToggleState = 'idle';
  }
  vm.clearLogo = function () {
    vm.newLogo = null;
  }
}