(function () {
  angular.module('showroom').component('srRepoContent', {
    templateUrl: 'client/views/components/repoContent.html',
    bindings: {
      repo: '<'
    },
    controller: RepoContentController
  });

  RepoContentController.$inject = ['orderByFilter', 'GithubRepoService'];

  function RepoContentController (orderBy, github) {
    this.$onInit = function() {
      github.getRepoContent(this.repo).then(function (content) {
        this.dirContent = filterByType(content);
        this.contentType = 'dir';
      }.bind(this));
    };

    function filterByType (content) {
      var filteredContent = orderBy(content, function (item) {
        return item.type === 'dir' ? 0 : 1;
      });

      return filteredContent;
    }
    this.showContent = function (contentSource) {
      var contentType = contentSource.type;
      
      github.getContent(this.repo, contentSource.path).then(function (data) {
        if (contentType === 'dir') {
          this.dirContent = filterByType(data);
        } else {
          this.fileContent = atob(data.content);
          this.fileType = data.name.split('.').pop();
        }
        this.contentType = contentType;
        this.currentPath = contentSource.path;
        console.log(this.currentPath);
      }.bind(this));
    }
    this.goUpFolders = function () {
      var pathParts = this.currentPath.split('/');
      var path = pathParts.slice(0, pathParts.length - 1).join('/'); 
      github.getContent(this.repo, path).then(function (content) {
        this.dirContent = filterByType(content);
        this.contentType = 'dir';
        this.currentPath = path;
      }.bind(this)); 
    }
  }
})();