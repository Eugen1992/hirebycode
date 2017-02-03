const Location = require('../../models/location');

module.exports = function getLocationData (placeId) {
  return Location.findOne({ placeId }).then((location) => {
    return {
      city: location.city,
      country: location.country,
      placeId
    };
  }, (error) => {
    return error;
  });
}