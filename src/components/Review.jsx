// Review.jsx
import React from 'react';

function Review({ review, showDetails }) {
  return (
    <div
    style={{
      border: '1px solid white',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '5px',
      textAlign: 'left',
      width: '100%',           // make it fill the column
      boxSizing: 'border-box', // makes padding play nicely
    }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <p style={{ wordBreak: 'break-word', marginRight: '5px', flex: 1 }}>
          {review.text}
        </p>
        {showDetails && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              marginLeft: '5px',
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
              }}
            >
              {review.rating}
            </div>
            <span style={{ marginLeft: '5px' }}>
              ({review.date.slice(5, 7)}/{review.date.slice(2, 4)})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;