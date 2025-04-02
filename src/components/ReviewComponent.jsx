import React, { useState, useEffect } from 'react';
import ReviewColumn from './ReviewColumn';
import ReviewSearch from './ReviewSearch';
import ShowDetailsIcon from './ShowDetailsIcon';
import AddReview from './AddReview';
import { API_BASE_URL } from '../config';

function ReviewComponent({ dormId }) {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/dorms/${dormId}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch dorm reviews');
        }
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

    fetchReviews();
  }, [dormId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const roundedAvg = avg !== null && avg !== 0 ? parseFloat(avg).toFixed(2) : 'N/A';
  const avgColor = getAverageColor(avg);

  const refreshReviews = async () => {
    await fetchReviews();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '600px',
      }}
    >
      <h2 style={{ textAlign: 'center', width: '100%' }}>
      <div>
      <span style={{ color: 'white' }}>Student Reviews (</span>
      <span style={{ color: avgColor }}>{roundedAvg}</span>
      <span style={{ color: 'white' }}>)</span>
    </div>
      </h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '82%',
          gap: '10px',
        }}
      >
        <div style={{ flex: 15, margin: 3, marginRight: '17px' }}>
          <ReviewSearch reviews={reviews} setFilteredReviews={setFilteredReviews} />
        </div>
        <div style={{ flex: .5, display: 'flex', justifyContent: 'center', marginTop: '-5px' }}>
        <ShowDetailsIcon showDetails={showDetails} setShowDetails={setShowDetails} />
        </div>
        <div style={{ flex: .5, display: 'flex', justifyContent: 'center', marginTop: '-10px' }}> {/* Increased flex */}
          <AddReview dormId={dormId} onReviewAdded={refreshReviews} />
        </div>
      </div>
      <ReviewColumn reviews={filteredReviews} showDetails={showDetails} />
    </div>
  );
}

// Function to determine the color based on the average rating
function getAverageColor(avg) {
  if (avg === null) return 'gray'; // Default color when avg is not available

  const hue = ((avg - 1) / 4) * 120; // Scale hue from 0 to 120 (red to green)
  return `hsl(${hue}, 100%, 50%)`;
}

export default ReviewComponent;