GithubLoginController.$inject = ['$scope', '$window'];
angular.module('showroom').controller('GithubLoginController',  GithubLoginController);

function GithubLoginController ($scope, $window) {
  var opener = $window.opener;
  var params = $window.location.search.substring(1);
  var pair;
  var code;
  
  if (params && opener && opener.location.origin === $window.location.origin) {
    pair = params.split('=');
    code = decodeURIComponent(pair[1]);
    
    opener.postMessage(code, $window.location.origin);
  }
}