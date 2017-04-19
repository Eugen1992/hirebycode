(function() {
  angular.module('showroom').controller('AdminSkillsController', AdminSkillsController);

  AdminSkillsController.$inject = ['$scope', 'SkillsService'];
  function AdminSkillsController ($scope, SkillsService) {
    var vm = this;
    getSkills();

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
      vm.mergingTo = skill;
    }
    function getSkills () {
      SkillsService.getSkills().then(function (skills) {
        vm.skills = skills;
      });
    }
  }
})();