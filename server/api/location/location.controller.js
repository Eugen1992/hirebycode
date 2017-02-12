const Location = require('../../models/location');

module.exports = {
  get: (req, res) => {
    Location.find({}).then((locations) => {
      res.send(locations);
    });
  }
}