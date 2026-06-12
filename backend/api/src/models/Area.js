const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  areaId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  population: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Area', areaSchema);