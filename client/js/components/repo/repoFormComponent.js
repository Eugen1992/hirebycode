(function () {
  angular.module('showroom').component('repoForm', {
    templateUrl: 'client/views/components/repoForm.html',
    bindings: {
      repo: '=',
      repoState: '<',
      submitState: '<',
      submitCallback: '&',
      errorText: '<',
      successText: '<',
      buttonText: '<'
    },
    controller: RepoFormController
  });
  RepoFormController.$inject = ['$scope', '$q', 'SkillsService', 'TrainingCentersService'];
  function RepoFormController ($scope, $q, SkillsService, TrainingCentersService) {
    var vm = this;
    vm.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    vm.$onInit = function () {
      TrainingCentersService.getAll().then(function (centers) {
        vm.trainingCenters = centers;
      });
      SkillsService.getSkills().then(function (skills) {
        vm.skills = skills;
      });
    }
    vm.submit = function () {
      if (!vm.form.$valid) {
        return;
      }
      vm.repo.trainingCenter = vm.repo.trainingCenter || null;
      vm.submitCallback();
    }
    vm.autocompleteSkills = function (skillSymbols) {
      return $q.resolve(vm.skills.filter(function (skill) {
        return skill.name.indexOf(skillSymbols) > -1;
      }));
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
