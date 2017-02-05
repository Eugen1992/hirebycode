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
        console.log(centers);
        this.trainingCenters = centers;
      }.bind(this));
    }
    this.submit = function () {
      this.repo.skills = getEnteredSkills(this.skills);
      this.submitCallback();
    }
    SkillsService.getSkills().then(function (skills) {
      this.skills = formSkillsList(skills, this.repo);
    }.bind(this));
  }

  function getEnteredSkills (skills) {
    return skills.reduce(function (finalList, skill) {
      if (skill.used) {
        finalList.push(skill._id);
      }
      return finalList;
    }, []);
  }
  function formSkillsList (skillsArray, repo) {
    if (repo.skills) {
      return skillsArray.map(function(skill) {
        skill.used = repo.skills.some(function (repoSkill) {
          return skill._id === repoSkill._id;
        });
        return skill;
      });
    } else {
      return skillsArray;
    }
    
  }
}());

