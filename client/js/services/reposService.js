ReposService.$inject = ['$q', '$http'];
app.service('ReposService', ReposService);

function ReposService ($q, $http) {
  this.search = function (user) {
    return $http.get('https://api.github.com/users/' + user + '/repos');
  }
  this.import = function (userName, repoName) {    
    return $http.post('/repos', {user: userName, name: repoName})
  }
  this.getImported = function () {    
    return $http.get('/repos')
  }
  this.delete = function (id) {
    return $http.delete('/repos/' + id);
  }
}