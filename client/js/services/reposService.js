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
    var dataToSend = repo.hbcData;
    
    dataToSend.providerId = repo.id;
    dataToSend.name = repo.name;

    return $http.post(baseUrl, dataToSend);
  }
  this.getImported = function () {
    return $http.get(baseUrl).then(function(response) {
      return response.data;
    });
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
  this.getMostRecent = function () {
    return this.getImported();
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
    return $http.get(baseUrl + '/user');
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