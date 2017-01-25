(function() {
  angular.module('showroom').controller('AdminTrainingCentersController', AdminTrainingCentersController);

  AdminTrainingCentersController.$inject = ['$scope', 'AdminTrainingCentersService'];
  function AdminTrainingCentersController ($scope, AdminTrainingCentersService) {
    var vm = this;

    vm.addTrainingCenter = function() {
      AdminTrainingCentersService.createTrainingCenter(
        vm.newTrainingCenter.password,
        vm.newTrainingCenter.login,
        vm.newTrainingCenter.name);
    }
    vm.removeSkill = function(skill) {
      SkillsService.removeSkill(skill).then(function (skills) {
        vm.skills = skills;
      });
    }
    function getSkills () {
      SkillsService.getSkills().then(function (skills) {
        vm.skills = skills;
      });
    }
  }
})();