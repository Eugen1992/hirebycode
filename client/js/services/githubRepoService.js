(function () {
  GithubRepoService.$inject = ['$http', 'UserLocalService'];
  angular.module('showroom').service('GithubRepoService', GithubRepoService);

  function GithubRepoService ($http, user) {
    this.getRepoContent = function (repo, path) {
      var url;

      if (!path) {
        url = repo.contents_url.replace('/{+path}', '');
      } else {
        url = repo.contents_url.replace('{+path}', path);
      }

      return fetchDataFromGithub(url).then(function (response) {
        return response.data;
      });
    }
    this.pullRepoByLink = function (browserUrl) {
      var apiUrl = browserUrl.replace('github.com/', 'api.github.com/repos/');
      return fetchDataFromGithub(apiUrl).then(function (response) {
        return response.data;
      });
    }
    this.getByProviderId = function (id) {
      var url = 'https://api.github.com/repositories/' + id;

      return fetchDataFromGithub(url)
        .then(function (response) {
          return response.data;
        });
    }
    function fetchDataFromGithub(url) {
      return $http.get('/api/github-proxy/' + encodeURIComponent(url), {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          //'Authorization': 'token ' + user.getProviderToken()
        }
      });
    }
  }
})();
