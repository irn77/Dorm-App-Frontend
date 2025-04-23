import React from 'react';
import colors from '../styles/colors';

function Review({ review, showDetails }) {
  return (
    <div
      style={{
        border: `1px solid ${colors.reviewBorderBoxColor}`,
        padding: '10px',
        margin: '5px 0',
        borderRadius: '10px',
        textAlign: 'left',
        width: '100%',
        boxSizing: 'border-box',
        color: colors.dormPageText,
      }}
    >
      {/* Conditionally show the rating/date at the top */}
      {!showDetails && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.9rem',
            color: '#ccc',
            marginBottom: '8px',
            gap: '8px',
          }}
        >
          <div
            style={{
              borderRadius: '50%',
              border: '1px solid white',
              color: 'white',
              width: '20px',
              height: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem',
            }}
          >
            {review.rating}
          </div>
          <span>
            {review.date.slice(5, 7)}/{review.date.slice(2, 4)}
          </span>
        </div>
      )}

      {/* Review text */}
      <p style={{ wordBreak: 'break-word' }}>
        {review.text}
      </p>
    </div>
  );
}

export default Review;
