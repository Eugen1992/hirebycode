HeaderController.$inject = ['$scope', '$state', 'UserLocalService', 'AuthService', 'Analytics'];
angular.module('showroom').controller('HeaderController', HeaderController);

function HeaderController ($scope, $state, user, auth, analytics) {
  $scope.isLoggedIn = user.isLoggedIn();
  $scope.logOut = function () {
    trackLogout(user.getUser().type);
    user.logOut();
    $state.go('home');
  }
  $scope.logIn = function () {
    auth.github().then(function (login) {
        $state.go('user-home');
    }, function (err) {
        console.log('error');
    });
  }
  $scope.$watch(function() {
    return user.isLoggedIn();
  }, function () {
    $scope.isLoggedIn = user.isLoggedIn();
  });

  function trackLogout(type) {
    switch (type) {
      case 'trainingCenter':
        analytics.trackEvent('Training Center', 'Logout');
        break;
      case 'developer':
        analytics.trackEvent('Training Center', 'Logout');
        break;
      case 'admin':
        analytics.trackEvent('Training Center', 'Logout');
        break;
    }
  }
}