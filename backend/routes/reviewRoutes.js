const express = require('express');
const Book = require('../models/bookModel');
const router = express.Router();

// Add a review
router.post('/:id/reviews', async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const newReview = { user, rating, comment };
    book.reviews.push(newReview);
    book.averageRating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;

    await book.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
