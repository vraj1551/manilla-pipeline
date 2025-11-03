const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // 🔥 added slug field
  content: { type: String, required: true },
  image: { type: String },
  tags: [String],
  category: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
