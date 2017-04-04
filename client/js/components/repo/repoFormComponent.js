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
    var vm = this;
    vm.$onInit = function () {
      TrainingCentersService.getAll().then(function (centers) {
        vm.trainingCenters = centers;
      });
      SkillsService.getSkills().then(function (skills) {
        vm.skills = SkillsService.skillsToStrings(skills, vm.repo);
      });
      vm.enteredSkills = SkillsService.skillsToStrings(vm.repo.skills);
    }
    vm.submit = function () {
      if (!vm.form.$valid) {
        return;
      }
      vm.repo.skills = SkillsService.skillsToObjects(vm.enteredSkills);
      vm.repo.trainingCenter = vm.repo.trainingCenter || null;
      vm.submitCallback();
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
