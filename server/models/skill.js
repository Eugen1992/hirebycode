var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillSchema = new Schema({
  name: String,
  addedByUser: Boolean
});

var Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;