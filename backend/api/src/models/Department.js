const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  manager: { type: String },
  contactEmail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Department', departmentSchema);
