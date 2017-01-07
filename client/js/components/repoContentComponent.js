(function () {
  angular.module('showroom').component('srRepoContent', {
    templateUrl: 'client/views/components/repoContent.html',
    bindings: {
      repo: '<'
    },
    controller: RepoContentController
  });

  RepoContentController.$inject = ['orderByFilter', 'GithubRepoService', '$state', '$stateParams'];

  function RepoContentController (orderBy, github, state, stateParams) {
    this.$onInit = function () {
      github.getRepoContent(this.repo, stateParams.contentPath).then(function (data) {
        var contentType = stateParams.contentType || 'dir';
        if (contentType === 'dir') {
          this.dirContent = filterByType(data);
        } else {
          this.fileContent = atob(data.content);
          this.fileType = data.name.split('.').pop();
        }

        this.contentType = contentType;
        this.currentPath = stateParams.contentPath;
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
      
      github.getRepoContent(this.repo, contentSource.path).then(function (data) {
        if (contentType === 'dir') {
          this.dirContent = filterByType(data);
        } else {
          this.fileContent = atob(data.content);
          this.fileType = data.name.split('.').pop();
        }
        this.contentType = contentType;
        this.currentPath = contentSource.path;
        state.go(
          state.current.name, 
          angular.extend(
            state.params,
            { contentPath: this.currentPath, contentType: this.contentType }
          )
        );
      }.bind(this));
    }
    this.goUpFolders = function () {
      var pathParts = this.currentPath.split('/');
      var path = pathParts.slice(0, pathParts.length - 1).join('/'); 
      github.getRepoContent(this.repo, path).then(function (content) {
        this.dirContent = filterByType(content);
        this.contentType = 'dir';
        this.currentPath = path;
        state.go(
          state.current.name, 
          angular.extend(
            state.params,
            { contentPath: this.currentPath, contentType: this.contentType }
          )
        );
      }.bind(this)); 
    }
  }
})();