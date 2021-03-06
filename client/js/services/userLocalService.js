UserLocalService.$inject = ['$q', '$window'];
app.service('UserLocalService', UserLocalService);

function UserLocalService ($q, $window) {
  this.setToken = function (token) {
    $window.localStorage.setItem('token', token);
  }
  this.setUser = function (user) { 
    $window.localStorage.setItem('user', JSON.stringify(user));
  }
  this.getToken = function () {
    return $window.localStorage.getItem('token');
  }
  this.getProviderToken = function () {
    return $window.localStorage.getItem('providerToken');
  }
  this.setProviderToken = function (token) {
    return $window.localStorage.setItem('providerToken', token);
  }
  this.isLoggedIn = function () {
    return !!$window.localStorage.getItem('token');
  }
  this.isAdmin = function () {
    var user = this.getUser();
    return this.isLoggedIn() && user && user.type === 'admin';
  }
  
  this.isDeveloper = function () {
    var user = this.getUser();
    return this.isLoggedIn() && user && user.type === 'developer';
  }
  this.logOut = function () {
    $window.localStorage.removeItem('token');
    $window.localStorage.removeItem('user');
  }
  this.getUser = function() {
    return JSON.parse($window.localStorage.getItem('user'));
  }
}