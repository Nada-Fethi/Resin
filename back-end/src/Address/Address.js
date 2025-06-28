// models/Address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: String,
  phone: String,
  addressLine: String,
  city: String,
  postalCode: String,
  isDefault: { type: Boolean, default: false }
});

module.exports = mongoose.model('Address', addressSchema);
