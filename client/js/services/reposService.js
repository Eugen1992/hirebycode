ReposService.$inject = ['$q', '$http', '$filter'];
app.service('ReposService', ReposService);

function ReposService ($q, $http, $filter) {
  var baseUrl = '/api/repo';
  var fetched = false;
  var repos;

  this.getMostRecent = function () {
    return this.getImported();
  }

  this.getCurrentRepos = function () {
    return repos;
  }
  this.getImported = function () {
    return $http.get(baseUrl).then(function(response) {
      return response.data;
    });
  }
  this.getByProviderId = function (repoProviderId) {
    var defer = $q.defer();
    var promise = defer.promise;
    var repo;
    
    repoProviderId = Number(repoProviderId);
    
    if (fetched) {
      repo = $filter('filter')(repos, {id: repoProviderId}, true)[0];
      defer.resolve(repo);
    } else {
      this.getUserRepos().then(function () {
        repo = $filter('filter')(repos, {id: repoProviderId}, true)[0];
        defer.resolve(repo);
      });
    }
    
    return promise;
  }
  this.getRepoByHbcId = function (hbcId) {
    var defer = $q.defer();
    var promise = defer.promise;

    var repo;
    
    return $http.get(baseUrl + '/' + hbcId).then(function (response) {
      return response.data;
    })
  }
}