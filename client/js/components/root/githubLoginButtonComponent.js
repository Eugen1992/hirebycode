(function () {
  angular.module('showroom').component('srGithubLoginButton', {
    templateUrl: 'client/views/components/root/githubLoginButton.html',
    controller: GithubLoginButtonController,
    bindings: {
      text: '<'
    }
  });

  GithubLoginButtonController.$inject = ['$state', 'AuthService', 'Analytics'];
  function GithubLoginButtonController ($state, auth, analytics) {
    var vm = this;

    vm.login = function () {
      analytics.trackEvent('Developer', 'Login', 'start');
      auth.github().then(function (user) {
          if (user.isNewUser) {
            analytics.trackEvent('Developer', 'Signup', 'success');
            $state.go('edit-developer-profile');
          } else {
            analytics.trackEvent('Developer', 'Login', 'success');
            $state.go('user-home');
          }
          
      }, function (err) {
          analytics.trackEvent('Developer', 'Login', 'error', err.status);
          console.log(err);
      });
    }
  }
})();