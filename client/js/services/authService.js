AuthService.$inject = ['$q', '$http', '$window'];
app.service('AuthService', AuthService);

function AuthService ($q, $http, $window) {
  function buildUrl () {
    var url = 'https://github.com/login/oauth/authorize';
    var clientId = '11ab72fc5d5b195ee720';
    var redirectUrl = 'http://www.hirebycode.me/#/github-login';
    
    url += '?client_id=' + clientId;
    url += '&scope=user';
    url += '&redirectUrl=' + redirectUrl;
    
    return url;
  }
  
  this.github = function () {
    var deferred = $q.defer();

    openPopup(deferred);
    
    return deferred.promise;  
  }
  
  function postCode (code, deferred) {
    $http.post('/api/auth/github', {code: code}).then(function (response) {
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
}