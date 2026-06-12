const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  citizenId: { type: String, required: true },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  departmentId: { type: String },
  areaId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);