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

  this.skillsToStrings = function (skillsObjects) {
    if (!skillsObjects) {
      return [];
    }
    return skillsObjects.map(function(skill) {
      return skill.name;
    });
  }
  this.skillsToObjects = function (skillsStrings) {
    return skillsStrings.map(function (skillName) {
      var skillObject = skills.find(function (skill) {
        return skill.name === skillName;
      });
      return skillObject || {
        name: skillName,
        isNew: true
      };
    });
  }
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
}