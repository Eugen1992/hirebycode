GithubRepoService.$inject = ['$http', 'UserLocalService'];
angular.module('showroom').service('GithubRepoService', GithubRepoService);

function GithubRepoService ($http, user) {
  var repoContent;
  this.getRepoContent = function (repo) {
    var url = repo.contents_url.replace('/{+path}', '');
    //var url = 'https://api.github.com/repos/Eugen1992/bee-medicine/contents';
    return $http.get(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + user.getProviderToken()
      }
    }).then(function (response) {
      repoContent = response.data;
      return response.data;
    });
  },
  this.getContent = function (repo, path) {
    var url = repo.contents_url.replace('{+path}', path);
    return $http.get(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + user.getProviderToken()
      }
    }).then(function (response) {
      return response.data;
    });
  }
}