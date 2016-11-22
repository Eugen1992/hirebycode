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
      return $http.get('api/skills-set').then(function (response) {
        skills = response.data;
        return skills;
      });
    }
  }
}