GithubRepoService.$inject = ['$http', 'UserService'];
angular.module('showroom').service('GithubRepoService', GithubRepoService);

function GithubRepoService ($http, user) {
  var repoContent;
  this.getRepoContent = function (repo) {
    var url = repo.contents_url.replace('/{+path}', '');
    return $http.get(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + user.getProviderToken()
      }
    }).then(function (response) {
      repoContent = response.data;
      return response.data;
    });
  }
}