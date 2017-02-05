FiltersService.$inject = ['$http', '$q', 'SkillsService', 'TrainingCentersService'];
app.service('FiltersService', FiltersService);

function FiltersService ($http, $q, skillsService, trainingCentersService) {
  var fetched;
  var filtersList ={};
  var filters =  {
    skill: {},
    school: null,
    location: null,
    flattenFilters: []
  };

  this.loadFiltersLists = function () {
    if (fetched) {
      return $q.resolve(filtersList);
    } else {
      return $q.all([this.loadSchoolsList(), this.loadSkillsList()])
      .then(function () {
        fetched = true;
        return filtersList;
      });
    }
  };
  this.loadSkillsList = function () {
    return skillsService.getSkills().then(function (skillsList) {
      filtersList.skills = skillsList;
      return skillsList;
    });
  };
  this.loadSchoolsList = function () {
    return trainingCentersService.getAll().then(function (trainingCenters) {
      filtersList.schools = trainingCenters;
      return trainingCenters;
    });
  };
  this.createFiltersFromState = function (stateParams) {
    this.createSkillFiltersFromState(stateParams);

    return $q.resolve(filters);
  };
  this.createSkillFiltersFromState = function (stateParams) {
    if (stateParams.skillFilter) {
      stateParams.skillFilter.split(',').reduce(function (filters, skillId) {
        var skillInfo = filtersList.skills.find(function(currentSkill) {
          return currentSkill._id === skillId;
        });
        filters.skill[skillId] = skillInfo;
        filters.flattenFilters.push({
          _id: skillInfo._id,
          type: 'skill',
          text: skillInfo.name
        });
        return filters;
      }, filters);
    }
  };

  this.addSkillToFilters = function (skill) {
    if (filters.skill[skill._id]) {
      return $q.resolve(filters);
    }
    filters.skill[skill._id] = skill;
    filters.flattenFilters.push({
      text: skill.name,
      _id: skill._id,
      type: 'skill'
    });
    return $q.resolve(filters);
  };

  this.addSchoolToFilters = function (school) {
    filters.school = school;
    filters.flattenFilters.push({
      text: school.name,
      _id: school._id,
      type: 'school'
    });
    return $q.resolve(filters);
  };

  this.removeFilter = function(filter) {
    switch (filter.type) {
      case 'skill':
        delete filters.skill[filter._id];
        var index = filters.flattenFilters.indexOf(filter);
        if (index > -1) {
          filters.flattenFilters.splice(index, 1);
        }
        break;
      case 'school':
        filters.school = null;
        break;
      case 'location':
        filters.location = null;
    }

    return $q.resolve(filters);
  };
}