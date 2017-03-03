(function () {
  angular.module('showroom').component('repoForm', {
    templateUrl: 'client/views/components/repoForm.html',
    bindings: {
      repo: '=',
      state: '<',
      submitCallback: '&',
      errorText: '<',
      successText: '<'
    },
    controller: RepoFormController
  });
  RepoFormController.$inject = ['$scope', 'SkillsService', 'TrainingCentersService'];
  function RepoFormController ($scope, SkillsService, TrainingCentersService) {
    this.$onInit = function () {
      console.log(this.repo);
      TrainingCentersService.getAll().then(function (centers) {
        this.trainingCenters = centers;
      }.bind(this));
      SkillsService.getSkills().then(function (skills) {
        this.skills = SkillsService.skillsToStrings(skills, this.repo);
      }.bind(this));
      this.enteredSkills = SkillsService.skillsToStrings(this.repo.skills);
    }
    this.submit = function () {
      this.repo.skills = SkillsService.skillsToObjects(this.enteredSkills);
      this.submitCallback();
    }
  }

  function getEnteredSkills (skills) {
    return skills.reduce(function (finalList, skill) {
      if (skill.used) {
        finalList.push(skill._id);
      }
      return finalList;
    }, []);
  }
}());
