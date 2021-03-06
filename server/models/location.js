var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  city: String,
  country: String,
  placeId: String
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;