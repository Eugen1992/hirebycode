AuthService.$inject = ['$q', '$http', '$window', 'UserLocalService', 'UserService'];
app.service('AuthService', AuthService);

function AuthService ($q, $http, $window, userLocalService, userService) {
  this.github = function () {
    var deferred = $q.defer();
    userLocalService.logOut();
    openPopup(deferred);
    
    return deferred.promise;
  };
  this.trainingCenter = function (login, password) {
    return $http.put('/api/auth/training', {
      login: login,
      password: password
    }).then(function (response) {
      setUserData(response.data.token, response.data.user, null);
      return {result: 'success'};
    });
  }
  this.admin = function (login, password) {
    return $http.put('/api/auth/admin', {
      login: login,
      password: password
    }).then(function (response) {
      setUserData(response.data.token, response.data.user, null);
      return {result: 'success'};
    });
  }
  function postCode (code, deferred) {
    $http.get('/api/auth/github?code=' + code).then(function (response) {
      setUserData(response.data.token, response.data.user, response.data.githubToken);
      deferred.resolve(response.data);
    });
  }
  function setUserData(token, userData, providerToken) {
    userLocalService.setToken(token);
    userLocalService.setUser(userData);
    providerToken && userLocalService.setProviderToken(providerToken);
  }
  function openPopup (deferred) {
    var url = buildUrl();
    var popupX = ($window.outerWidth - 500) / 2;
    var popupY = ($window.outerHeight- 500) / 2;
    var options = 'width=500, height=500, left=' + popupX + ', top=' + popupY;
    var popup = $window.open(url, '', options);  
    
    $window.focus();
    $window.addEventListener('message', function messageHandler (event) {
      if (event.origin === $window.location.origin) {
        popup.close();
        postCode(event.data, deferred);
      }
      $window.removeEventListener('message', messageHandler);
    });
  }

  function buildUrl () {
    var url = 'https://github.com/login/oauth/authorize';
    var clientIds = {
      dev: '11ab72fc5d5b195ee720',
      test: 'eb5f166749f8dd122fb0',
      production: '46704eae5252da4bc665'
    };
    var clientId = clientIds[window.env];

    url += '?client_id=' + clientId;

    return url;
  }
}