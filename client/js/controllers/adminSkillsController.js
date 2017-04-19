(function() {
  angular.module('showroom').controller('AdminSkillsController', AdminSkillsController);

  AdminSkillsController.$inject = ['$scope', 'SkillsService'];
  function AdminSkillsController ($scope, SkillsService) {
    var vm = this;
    getSkills();
    vm.skillsToMergeIn = [];

    vm.addSkill = function() {
      SkillsService.createSkill(vm.newSkillName);
      getSkills();
    }
    vm.removeSkill = function(skill) {
      SkillsService.removeSkill(skill).then(function (skills) {
        vm.skills = skills;
      });
    }
    vm.onMergeToChange = function (skill) {
      vm.mergingTo = skill.mergingTo ? skill : null;
    }
    vm.onMergeInChange = function (skill) {
      vm.skillsToMerge = vm.skills.filter(function (skill) {
        return skill.mergingIn;
      })
    }
    vm.merge = function () {
      SkillsService.mergeSkills(vm.mergingTo, vm.skillsToMerge);
    }
    function getSkills () {
      SkillsService.getSkills().then(function (skills) {
        vm.skills = skills;
      });
    }
  }
})();