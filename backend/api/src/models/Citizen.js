const mongoose = require('mongoose');

const citizenSchema = new mongoose.Schema({
  citizenId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  district: { type: String },
  preferredServices: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Citizen', citizenSchema);