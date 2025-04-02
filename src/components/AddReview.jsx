import React, { useState, useContext } from 'react';
import './AddReview.css';
import { AuthContext } from './AuthContext';
import { API_BASE_URL } from '../config';

function AddReview({ dormId, onReviewAdded }) {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New state for success modal

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setErrorMessage('You must sign in to add a review');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dorm_id: dormId, rating, text, user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      onReviewAdded();
      setShowModal(false);
      setErrorMessage('');
      setShowSuccessModal(true); // Show success modal
      setTimeout(() => setShowSuccessModal(false), 7000); // Hide success modal after 5 seconds
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  return (
    <div>
      {/* Error Message */}
      {errorMessage && <div className="error-bar">{errorMessage}</div>}

      <button
        className="add-review-button"
        onClick={() => {
          if (!isLoggedIn) {
            setErrorMessage('You must sign in to add a review');
            setTimeout(() => setErrorMessage(''), 3000);
          } else {
            setShowModal(true);
          }
        }}
      >
        +
      </button>

      {showModal && (
        <div className="modal5">
          <div className="modal-content5">
            <span
              className="close5"
              onClick={() => setShowModal(false)}
              style={{ color: 'black' }}
            >
              &times;
            </span>
            <h2 style={{ color: 'black', textAlign: 'center' }}>Add a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label style={{ color: 'black' }}>Rating:</label>
                <div className="star-rating" style={{ display: 'flex', justifyContent: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= rating ? 'star selected' : 'star'}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label style={{ color: 'black' }}>Review:</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your review here..."
                />
              </div>

              <button type="submit" className="submit-button">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <p>Success: Thanks for adding a review! Please allow 24 hours for the review to show.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddReview;