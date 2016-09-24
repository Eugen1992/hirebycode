ReposService.$inject = ['$q', '$http', '$filter'];
app.service('ReposService', ReposService);

function ReposService ($q, $http, $filter) {
  var baseUrl = '/api/repos';
  var repos;
  
  this.search = function (user) {
    return $http.get('https://api.github.com/users/' + user + '/repos');
  }
  this.getUserRepos = function () {
    var promise = $http.get(baseUrl + '/user');
    
    promise.then(function (response) {
      repos = response.data;
    });
    return promise;
  }
  this.getCurrentRepos = function () {
    return repos;
  }
  this.import = function (userName, repoName) {    
    return $http.post(baseUrl, {name: repoName});
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