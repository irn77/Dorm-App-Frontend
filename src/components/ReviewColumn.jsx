import React from 'react';
import Review from './Review';

function ReviewColumn({ reviews, showDetails }) {
  if (!reviews || reviews.length === 0) {
    return ;
  }
  return (
    <div>
      {reviews.map((review) => (
        <Review key={review.review_id} review={review} showDetails={showDetails} />
      ))}
    </div>
  );
}

export default ReviewColumn;