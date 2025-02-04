import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({ reviewer: '', rating: 0, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError('Book not found');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Handle form submission for adding reviews
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:5000/api/books/${id}/reviews`, review); // Send review to backend
      setBook(response.data.book); // Update book details with the new review
      setReview({ reviewer: '', rating: 0, comment: '' }); // Reset the form
    } catch (err) {
      console.error(err.message);
      alert('Failed to add review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
    className="book-details-page"
    style={{
      backgroundImage: `url(${book.image})`,
    }}
  >
      <div className="book-details-overlay">
        <div className="book-details-content">
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p>{book.description}</p>

          <h2>Reviews</h2>
          <ul>
            {book.reviews && book.reviews.length > 0 ? (
              book.reviews.map((review, index) => (
                <li key={index}>
                  <p>
                    <strong>{review.reviewer}</strong> ({review.rating}/5): {review.comment}
                  </p>
                  <small>{new Date(review.date).toLocaleDateString()}</small>
                </li>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </ul>

          <h3>Add a Review</h3>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={review.reviewer}
                onChange={(e) => setReview({ ...review, reviewer: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Rating:</label>
              <Rating
                count={5}
                value={review.rating}
                size={30}
                activeColor="#ffd700"
                onChange={(newRating) => setReview({ ...review, rating: newRating })}
              />
            </div>
            <div>
              <label>Comment:</label>
              <textarea
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                required
              ></textarea>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;


//http://localhost:5000