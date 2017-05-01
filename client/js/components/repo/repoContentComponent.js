(function () {
  angular.module('showroom').component('srRepoContent', {
    templateUrl: 'client/views/components/repoContent.html',
    bindings: {
      repo: '<',
      hideDescription: '<',
    },
    controller: RepoContentController
  });

  RepoContentController.$inject = ['orderByFilter', 'GithubRepoService', '$state', '$stateParams'];

  function RepoContentController (orderBy, github, state, stateParams) {
    var vm = this;
    vm.$onInit = function () {
      vm.loading = true;
      github.getRepoContent(vm.repo, stateParams.contentPath).then(function (data) {
        var contentType = stateParams.contentType || 'dir';
        vm.loading = false;
        if (contentType === 'dir') {
          vm.dirContent = filterByType(data);
        } else {
          vm.fileContent = data;
          vm.fileType = stateParams.contentPath.split('.').pop();
        }

        vm.contentType = contentType;
        vm.currentPath = stateParams.contentPath;
      }, function (error) {
        if (error.data === 'error:empty-repository') {
          vm.loading = false;
          vm.showError('error:empty-repository');
        }
      });
    };

    function filterByType (content) {
      var filteredContent = orderBy(content, function (item) {
        return item.type === 'dir' ? 0 : 1;
      });

      return filteredContent;
    }

    vm.showContent = function (contentSource) {
      var contentType = contentSource.type;
      
      vm.loading = true;
      github.getRepoContent(vm.repo, contentSource.path).then(function (data) {
        vm.loading = false;
        vm.error = null;
        if (contentType === 'dir') {
          vm.dirContent = filterByType(data);
        } else {
          vm.fileContent = data;
          vm.fileType = contentSource.name.split('.').pop();
        }
        vm.contentType = contentType;
        vm.currentPath = contentSource.path;
        state.go(
          state.current.name, 
          angular.extend(
            state.params,
            { contentPath: vm.currentPath, contentType: vm.contentType }
          )
        );
      });
    }
    this.goUpFolders = function (step) {

      var pathParts = this.currentPath.split('/');
      var step = step === 'undefined' ? pathParts.length - 1 : step;
      var path = pathParts.slice(0, step).join('/'); 

      this.loading = true;
      github.getRepoContent(this.repo, path).then(function (content) {
        this.loading = false;
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
    vm.showError = function (errorCode) {
      switch (errorCode) {
        case 'error:empty-repo':
          vm.error = 'This repo is empty';
          break;
        default:
          vm.error = 'Somethign went wrong';
      }
      vm.error = 'This repo is empty.';
    }
  }
})();