import React, { useState, useEffect } from 'react';
import ReviewColumn from './ReviewColumn';
import ReviewSearch from './ReviewSearch';
import ShowDetailsIcon from './ShowDetailsIcon';
import AddReview from './AddReview';
import { API_BASE_URL } from '../config';
import './ReviewComponent.css';

function ReviewComponent({ dormId }) {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [avg, setAvg] = useState(0);
  const midpoint = Math.ceil(filteredReviews.length / 2);
  const leftReviews = filteredReviews.slice(0, midpoint);
  const rightReviews = filteredReviews.slice(midpoint);


  useEffect(() => {
    fetchReviews();
  }, [dormId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/dorms/${dormId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch dorm reviews');
      const data = await response.json();
      setReviews(data.reviews);
      setAvg(data.average_rating);
      setFilteredReviews(data.reviews);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshReviews = async () => {
    await fetchReviews();
  };

  const roundedAvg = avg !== null && avg !== 0 ? parseFloat(avg).toFixed(2) : 'N/A';
  const avgColor = getAverageColor(avg);

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;
  if (error) return <p style={{ color: 'white' }}>Error: {error.message}</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px', paddingLeft: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'white' }}>
  <h2 style={{ fontSize: '28px', margin: 0, color: 'white' }}>
    Student Reviews (<span style={{ color: avgColor }}>{roundedAvg}</span>)
  </h2>
  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
  {filteredReviews.length > 0 && (
  <ShowDetailsIcon showDetails={showDetails} setShowDetails={setShowDetails} />
)}
    <div style={{ width: '10px' }} />
    <AddReview dormId={dormId} onReviewAdded={refreshReviews} />
  </div>
</div>

      {/* Search Input */}
      <div style={{ maxWidth: '500px', marginBottom: '20px' }}>
        <ReviewSearch reviews={reviews} setFilteredReviews={setFilteredReviews} />
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
  <p style={{ color: 'white', marginTop: '10px', fontSize: '20px' }}>No Reviews. Add the first!</p>
    ) : (
      <div className="review-columns">
        <ReviewColumn reviews={leftReviews} showDetails={showDetails} />
        <ReviewColumn reviews={rightReviews} showDetails={showDetails} />
      </div>
    )}


    </div>
  );
}

function getAverageColor(avg) {
  if (avg === null || avg === 0) return 'gray';
  const hue = ((avg - 1) / 4) * 120;
  return `hsl(${hue}, 100%, 50%)`;
}

export default ReviewComponent;
