const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  reviews: [reviewSchema],
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
