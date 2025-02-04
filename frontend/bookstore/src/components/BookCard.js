import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import './BookCard.css'; // Include styles for the background image
import { useDispatch } from 'react-redux';

const BookCard = ({ book }) => {
  const backgroundStyle = {
    backgroundImage: `url(${book.image})`, // Use the `image` field from the API
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  const navigate = useNavigate();

   const showAlert = () => {
    window.alert("This is a native browser alert!");
  };

  return (
    <div className="book-card" style={backgroundStyle}>
      <div className="book-card-overlay">
        <h5 className="book-card-title">{book.title}</h5>
        <p className="book-card-author">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="book-card-genre">
          <strong>Genre:</strong> {book.genre}
        </p>
       <Link to={`/book/${book._id}`} className="book-card-button">
          View Details
        </Link>       
      </div>
    </div>
  );
};
 
export default BookCard;

//navigate(`/book/${book._id}`)     