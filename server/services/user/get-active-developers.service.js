const User = require('../../models/user');
const LocationServices = require('../location');

module.exports = function getActiveDevelopers (filters = { skill: [], location: '', school: ''}) {
  const { skill, location, school } = filters;

  const sQuery = {
    type: 'developer',
    'repos.0': {$exists: true},
    hidden: false,
    profileReadyForPublic: true
  };
  if (skill) {
    sQuery.skills = { $all: filters.skill };
  }
  if (school) {
    sQuery.trainingCenter = school;
  }
  if (location) {
    sQuery.placeId = location;
  }
  const projection = 'firstName lastName placeId avatar skills';

  return User.find(sQuery, projection)
  .populate('skills')
  .then((developers) => {
    return Promise.all(developers.map((developer) => {
      return LocationServices.getLocationData(developer.placeId).then((location) => {
        return Object.assign(developer.toObject(), location); 
      });
    }));
  });
}