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
      var importedRepo = response.data;
      if (repos) {
        repos.userImportedRepos.push(importedRepo);
        var repoIndex = repos.userGithubRepos.findIndex(function (repo) {
          return repo.id = importedRepo.providerId;
        });
      } else {
        return this.getUserRepos();
      }

    }.bind(this));
  }
  this.delete = function (options) {
    if (options.repo) {
      return deleteByModel(options.repo);
    } else if (options.hbcId) {
      return deleteById(options.hbcId);
    }
  }
  this.hide = function (options) {
    var repo = $filter('filter')(repos.userImportedRepos, {_id: options.hbcId}, true)[0];

    return $http.put(baseUrl + '/hide/' + repo._id).then(function () {
      repo.hidden = true;
    });
  }
  this.unhide = function (options) {
    var repo = $filter('filter')(repos.userImportedRepos, {_id: options.hbcId}, true)[0];

    return $http.put(baseUrl + '/unhide/' + repo._id).then(function () {
      repo.hidden = false;
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
    var repo = $filter('filter')(repos.userImportedRepos, {_id: repoId}, true)[0];
    
    return deleteByModel(repo);
  }
  function deleteByModel(repo) {
    return $http.delete(baseUrl + '/' + repo._id).then(function () {
      repos.userImportedRepos = repos.userImportedRepos.filter(function (importedRepo) {
        return repo._id !== importedRepo._id;
      });
      return repo;
    });
  }
  function replaceWithUpdated(updatedRepo) {
    if (fetched) {
      repos.userImportedRepos = repos.userImportedRepos.map(function(repo) {
        if (repo._id === updatedRepo._id) {
          return updatedRepo;
        }
        return repo;
      });
    } else {
      vm.getUserRepos();
    }
  }
}