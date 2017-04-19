SkillsService.$inject = ['$http', '$q'];
app.service('SkillsService', SkillsService);

function SkillsService ($http, $q) {
  var skills, fetched;
  this.getSkills = function () {
    if (fetched) {
      return $q(function (resolve, reject) {
        resolve(skills);
      })
    } else {
      return $http.get('api/skills').then(function (response) {
        fetched = true;
        skills = response.data;
        return skills;
      });
    }
  };

  this.createSkill = function (skillName) {
    return $http.post('api/skills', {name: skillName}).then(function(response) {
      var skill = response.data;
      skills.unshift(skill);

      return skill;
    });
  };

  this.removeSkill = function (skill) {
    return $http.delete('api/skills/' + skill._id).then(function(response) {
      skills.splice(skills.indexOf(skill), 1);
      return skills;
    });
  }
  this.mergeSkills = function (skillToMergeTo, skillsToMerge) {
    return $http.put('api/skills/merge', {
      skillToMergeTo: skillToMergeTo,
      skillsToMerge: skillsToMerge
    }).then(function(response) {
      console.log(response);
    });
  }
}