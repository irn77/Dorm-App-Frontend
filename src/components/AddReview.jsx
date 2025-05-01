import React, { useState, useContext } from 'react';
import './AddReview.css';
import { AuthContext } from './AuthContext';
import { API_BASE_URL } from '../config';

function AddReview({ dormId, onReviewAdded }) {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const [giveawayEmail, setGiveawayEmail] = useState(''); // New state
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dorm_id: dormId,
          rating,
          text,
          user_id: userId,
          giveaway_email: giveawayEmail || null, // Optional field
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      setShowModal(false);
      setErrorMessage('');
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 7000);
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  return (
    <div>
      {errorMessage && <div className="error-bar">{errorMessage}</div>}

      <button className="add-review-button" onClick={() => setShowModal(true)}>
        <span className="plus-icon">+</span> Add Review
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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      style={{
                        fontSize: '24px',
                        color: star <= rating ? 'gold' : 'gray',
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                      }}
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

              <div className="form-group">
  <label style={{ color: 'black' }}>
    (Optional) Enter email for $20 giveaway:{' '}
    <a
      href="/about"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        marginLeft: '8px',
        fontSize: '0.9rem',
        color: '#007bff',
        textDecoration: 'underline',
      }}
    >
      Learn more
    </a>
  </label>
  <input
    type="email"
    value={giveawayEmail}
    onChange={(e) => setGiveawayEmail(e.target.value)}
    placeholder="you@stanford.edu"
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
