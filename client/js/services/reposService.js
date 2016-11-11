ReposService.$inject = ['$q', '$http', '$filter'];
app.service('ReposService', ReposService);

function ReposService ($q, $http, $filter) {
  var baseUrl = '/api/repos';
  var fetched = false;
  var repos;

  this.getUserRepos = function () {
    var defer;
    var promise;
    if (fetched) {
      promise = $q.when(repos);
    } else {
      defer = $q.defer();
      promise = defer.promise;
      
      fetch().then(function (response) {
        repos = response.data;
        fetched = true;
        defer.resolve(repos);
      });  
    }
    
    return promise;
  }
  this.getCurrentRepos = function () {
    return repos;
  }
  this.import = function (repo) {
    return $http.post(baseUrl, repo);
  }
  this.getImported = function () {    
    return $http.get(baseUrl);
  }
  this.delete = function (options) {
    var deletePromise;
    
    if (options.repo) {
      deletePromise = deleteByModel(options.repo);
    } else if (options._id) {
      deletePromise = deleteById(options._id);
    }
    
    return deletePromise;
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
    
    if (fetched) {
      repo = $filter('filter')(repos, {_id: hbcId}, true)[0];
      defer.resolve(repo);
    } else {
      this.getUserRepos().then(function () {
        repo = $filter('filter')(repos, {_id: hbcId}, true)[0];
        defer.resolve(repo);
      });
    }
    
    return promise;
  }
  function fetch () {
    return $http.get(baseUrl + '/user');
  }
  function deleteById(repoId) {
    var repo = $filter('filter')(repos, {_id: repoId}, true)[0];
    
    return deleteByModel(repo);
  }
  function deleteByModel(repo) {
    return $http.delete(baseUrl + '/' + repo._id).then(function () {
      repo.imported = false;
    });
  }
}