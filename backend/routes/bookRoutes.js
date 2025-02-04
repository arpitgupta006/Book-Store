const express = require('express');
const Book = require('../models/bookModel');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a review to a book
router.post('/:id/reviews', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const { reviewer, rating, comment } = req.body;
    const review = { reviewer, rating, comment, date: new Date() };
    book.reviews.push(review);

    await book.save();
    res.status(201).json({ message: 'Review added successfully', book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;