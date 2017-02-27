const Location = require('../../models/location');

module.exports = function getLocationData (placeId) {
  return Location.findOne({ placeId }).then((location) => {
    if (location) {
      return {
        city: location.city,
        country: location.country,
        placeId
      };
    }
    return null;
  }, (error) => {
    return error;
  });
}