import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import colors from '../styles/colors'; // 🔥 import your color constants

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

  if (loading) return <p style={{ color: colors.white }}>Loading...</p>;
  if (error) return <p style={{ color: colors.errorRed }}>Error: {error.message}</p>;

  const getAverageColor = (avg) => {
    if (avg === null || avg === 0) return 'gray';
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
  };

  return (
    <div style={{ marginBottom: '1rem', color: colors.lightGray }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {dorms.map((dorm) => (
          <li key={dorm.dorm_id} style={{ marginBottom: '0.5rem', textAlign: 'left' }}>
            <Link
              to={`/dorm/${dorm.dorm_id}`}
              style={{ color: colors.lightGray, textDecoration: 'none' }}
            >
              {dorm.name}
            </Link>
            {showAllRatings && (
              <span style={{ color: getAverageColor(dorm.average_rating), marginLeft: '0.5rem' }}>
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
