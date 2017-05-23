UserReposService.$inject = ['$q', '$http', '$filter'];
app.service('UserReposService', UserReposService);

function UserReposService ($q, $http, $filter) {
  var vm = this;
  var baseUrl = '/api/repo/developer';
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

    return $http.post(baseUrl, dataToSend).then(function (response) {
      var hbcData = response.data;
      var githubId = hbcData.providerId;
      var repo;
      if (repos) {
        previousRepoIndex = repos.findIndex(function(repo) {
          return repo.id === githubId;
        });
        repo = repos[previousRepoIndex];
        repo.imported = true;
        repos.splice(previousRepoIndex, 1);
        repos.unshift(repo);
        repo.hbcData = hbcData;
        repo.hbcId = hbcData._id;
        return repo;
      } else {
        return this.getUserRepos();
      }

    }.bind(this));
  }
  this.delete = function (options) {
    var deletePromise;

    if (options.repo) {
      return deleteByModel(options.repo);
    } else if (options.hbcId) {
      return deleteById(options.hbcId);
    }
  }
  this.hide = function (options) {
    var repo = $filter('filter')(repos, {hbcId: options.hbcId}, true)[0];

    return $http.put(baseUrl + '/hide/' + repo.hbcId).then(function () {
      repo.hbcData.hidden = true;
    });
  }
  this.unhide = function (options) {
    var repo = $filter('filter')(repos, {hbcId: options.hbcId}, true)[0];

    return $http.put(baseUrl + '/unhide/' + repo.hbcId).then(function () {
      repo.hbcData.hidden = false;
    });
  }
  this.update = function (repo) {
    return $http.put(baseUrl + '/' + repo._id, repo)
      .then(function (response) {
        replaceWithUpdated(response.data);
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
  this.getRepoToEdit = function (hbcId) {
    return $http.get(baseUrl + '/for-edit/' + hbcId).then(function(response) {
      return response.data;
    });
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
      return repo;
    });
  }
  function replaceWithUpdated(updatedRepo) {
    if (fetched) {
      repos = repos.map(function(repo) {
        if (repo.hbcId === updatedRepo._id) {
          repo.hbcData = updatedRepo;
        }
        return repo;
      });
    } else {
      vm.getUserRepos();
    }
  }
}