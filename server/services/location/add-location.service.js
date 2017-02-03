const Location = require('../../models/location');

module.exports = function addLocation (data) {
  const { placeId, city, country } = data;

  return Location.findOne({ placeId }).then((location) => {
    if (location === null) {
      const location = new Location(data);
      return location.save();
    } else {
      return location;
    }
  }, (error) => {
    return error;
  });
}