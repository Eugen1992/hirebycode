AuthService.$inject = ['$q', '$http', '$window', 'UserService'];
app.service('AuthService', AuthService);

function AuthService ($q, $http, $window, userService) {
  this.github = function () {
    var deferred = $q.defer();

    openPopup(deferred);
    
    return deferred.promise;  
  };
  
  function postCode (code, deferred) {
    $http.get('/api/auth/github?code=' + code).then(function (response) {
      userService.setToken(response.data.token);
      userService.setUser(response.data.user);
      userService.setProviderToken(response.data.githubToken);
      deferred.resolve(response.data);
    });
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
    var clientId = '11ab72fc5d5b195ee720';
    var redirectUrl = 'http://www.hirebycode.me/api/auth/github-login';

    url += '?client_id=' + clientId;
    url += '&scope=user';
    url += '&redirectUrl=' + redirectUrl;

    return url;
  }
}