(function () {
  angular.module('showroom').component('repoForm', {
    templateUrl: 'client/views/components/repoForm.html',
    bindings: {
      repo: '=',
      submitCallback: '&'
    },
    controller: RepoFormController
  });
  RepoFormController.$inject = ['$scope', 'SkillsService', 'TrainingCentersService'];
  function RepoFormController ($scope, SkillsService, TrainingCentersService) {
    this.$onInit = function () {
      TrainingCentersService.getAll().then(function (centers) {
        this.trainingCenters = centers;
      }.bind(this));
    }
    this.submit = function () {
      this.repo.languages = getEnteredSkills(this.skills);
      this.submitCallback();
    }
    SkillsService.getSkills().then(function (skills) {
      this.skills = formSkillsList(skills, this.repo);
    }.bind(this));
  }

  function getEnteredSkills (skills) {
    return skills.reduce(function (finalList, skill) {
      if (skill.used) {
        finalList.push(skill.name);
      }
      return finalList;
    }, []);
  }
  function formSkillsList (skillsArray, repo) {
    return skillsArray.map(function(skill) {
      skill.used = repo.languages.indexOf(skill.name) > -1;
      return skill;
    });
  }
}());

