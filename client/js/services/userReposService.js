UserReposService.$inject = ['$q', '$http', '$filter'];
app.service('UserReposService', UserReposService);

function UserReposService ($q, $http, $filter) {
  var baseUrl = '/api/user/repos';
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
    var dataToSend = repo.hbcData;
    
    dataToSend.providerId = repo.id;
    dataToSend.name = repo.name;
    dataToSend.contents_url = repo.contents_url;
    dataToSend.createdAt = new Date().getTime();

    return $http.post(baseUrl, dataToSend);
  }
  this.delete = function (options) {
    var deletePromise;
    
    if (options.repo) {
      deletePromise = deleteByModel(options.repo);
    } else if (options.hbcId) {
      deletePromise = deleteById(options.hbcId);
    }
    
    return deletePromise;
  }
  this.update = function (repo) {
    var dataToSend = repo.hbcData;
    return $http.put(baseUrl + '/' + repo.hbcId, dataToSend);
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
      repo = $filter('filter')(repos, {hbcId: hbcId}, true)[0];
      defer.resolve(repo);
    } else {
      this.getUserRepos().then(function () {
        repo = $filter('filter')(repos, {hbcId: hbcId}, true)[0];
        defer.resolve(repo);
      });
    }
    
    return promise;
  }
  function fetch () {
    return $http.get(baseUrl);
  }
  function deleteById(repoId) {
    var repo = $filter('filter')(repos, {hbcId: repoId}, true)[0];
    
    return deleteByModel(repo);
  }
  function deleteByModel(repo) {
    return $http.delete(baseUrl + '/' + repo.hbcId).then(function () {
      repo.imported = false;
    });
  }
}