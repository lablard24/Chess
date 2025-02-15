const mongoose = require('mongoose');

const DiscountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true }, // Percentage discount
  expiryDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('DiscountCode', DiscountCodeSchema);
