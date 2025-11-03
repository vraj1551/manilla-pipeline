const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 190
  },
  isCurrent: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
