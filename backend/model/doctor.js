const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = Schema({
  name: String,
  last_name: String,
  title: String,
  email: String
});

module.exports = mongoose.model('doctor', DoctorSchema);
