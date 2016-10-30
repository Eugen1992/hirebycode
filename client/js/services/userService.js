UserService.$inject = ['$q', '$window'];
app.service('UserService', UserService);

function UserService ($q, $window) {
  this.setToken = function (token) {
    $window.localStorage.setItem('token', token);
  }
  this.setUser = function (user) { 
    $window.localStorage.setItem('user', JSON.stringify(user));
  }
  this.getToken = function () {
    return $window.localStorage.getItem('token');
  }
  this.getUser = function () { 
    return JSON.parse($window.localStorage.getItem('user'));
  }
}