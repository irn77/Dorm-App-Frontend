import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

//const API_BASE_URL = 'http://3.142.242.243:8000';

function NeighborhoodColumn({ neighborhoodName, showAllRatings }) {
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDormsWithAvg = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/neighborhood/${neighborhoodName}/dorms_with_avg`);
        if (!response.ok) {
          throw new Error('Failed to fetch dorms with average ratings');
        }
        const data = await response.json();
        setDorms(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDormsWithAvg();
  }, [neighborhoodName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const getAverageColor = (avg) => {
    if (avg === null || avg === 0) return 'gray'; // Handle null and 0
    const numAvg = parseFloat(avg);
    const hue = ((numAvg - 1) / 4) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const displayAverage = (avg) => {
    if (avg === null || avg === 0) {
      return "No reviews";
    } else {
      return `(${avg.toFixed(1)} Avg Rating)`;
    }
  }

  return (
    <div style={{ textAlign: 'left', marginRight: '20px', minWidth: '200px', color: 'white' }}>
      <h3>
        <Link to={`/neighborhood/${neighborhoodName}`} style={{ color: 'white', textDecoration: 'none' }}>
          {neighborhoodName}
        </Link>
      </h3>
      <hr />
      <ul>
        {dorms.map((dorm) => (
          <li key={dorm.dorm_id}>
            <Link to={`/dorm/${dorm.dorm_id}`} style={{ color: 'white', textDecoration: 'none' }}>
              {dorm.name}
            </Link>
            {showAllRatings && (
              <span style={{ color: getAverageColor(dorm.average_rating) }}>
                {' '}
                {displayAverage(dorm.average_rating)}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NeighborhoodColumn;