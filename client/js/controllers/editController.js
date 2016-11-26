EditController.$inject = ['$scope', '$element', 'orderByFilter', '$state', '$stateParams', 'GithubRepoService', 'repo', 'SkillsService', 'ReposService'];
angular.module('showroom').controller('EditController', EditController);

function EditController ($scope, $element, orderBy, $state, $stateParams, github, repo, skills, repos) {
  $scope.currentPath = '';
  $scope.isLoading = true;
  $scope.repo = repo;
  $scope.isLoading = false;
  github.getRepoContent(repo).then(function (content) {
    $scope.dirContent = filterByType(content);
    $scope.contentType = 'dir';
  });
  skills.getSkills().then(function (skills) {
    $scope.skills = formSkillsList(skills, $scope.repo);
  });
  function filterByType (content) {
    var filteredContent = orderBy(content, function (item) {
      return item.type === 'dir' ? 0 : 1;
    });

    return filteredContent;
  }
  $scope.showContent = function (contentSource) {
    var contentType = contentSource.type;
    
    github.getContent($scope.repo, contentSource.path).then(function (data) {
      if (contentType === 'dir') {
        $scope.dirContent = filterByType(data);  
      } else {
        console.log(data);
        $scope.fileContent = atob(data.content);
        $scope.fileType = data.name.split('.').pop();
      }
      $scope.contentType = contentType;
      $scope.currentPath += contentSource.path;
    });
  }
  $scope.goUpFolders = function () {
    var pathParts = $scope.currentPath.split('/');
    var path = pathParts.slice(0, pathParts.length - 1).join(''); 
    github.getContent($scope.repo, path).then(function (content) {
      $scope.dirContent = filterByType(content);
      $scope.contentType = 'dir';
      $scope.currentPath = path;
    }); 
  }
  $scope.submit = function () {
    $scope.repo.hbcData.languages = getEnteredSkills($scope.skills);
    repos.update($scope.repo);
  }
  $scope.toggleMode = function () {
    $state.go();
  }
  function getEnteredSkills (skills) {
    return skills.map(function (skill) {
      if (skill.used) {
        return skill.name;
      }
    });
  }
  function formSkillsList (skillsArray, repo) {
    return skillsArray.map(function(skillName) {
      return {
        name: skillName,
        used: repo.hbcData.languages.indexOf(skillName) > -1
      };
    });
  }
}