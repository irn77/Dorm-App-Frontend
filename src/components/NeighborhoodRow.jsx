// NeighborhoodRow.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import colors from '../styles/colors';
import slugMap from '../data/dormSlugMap.json';

function NeighborhoodRow({ neighborhoodName, neighborhoodColor }) {
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDorms = async () => {
      const apiUrl = `${API_BASE_URL}/api/neighborhood/${neighborhoodName}/dorms_with_avg`;
      console.log(`[NeighborhoodRow] Fetching dorms from: ${apiUrl}`);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          console.error(`[NeighborhoodRow] API error fetching ${neighborhoodName}:`, response.status);
          throw new Error(`Failed to fetch dorms with average ratings for ${neighborhoodName}`);
        }
        const data = await response.json();
        console.log(`[NeighborhoodRow] Dorms received for ${neighborhoodName}:`, data);
        setDorms(data);
        setLoading(false);
      } catch (err) {
        console.error(`[NeighborhoodRow] Error fetching ${neighborhoodName}:`, err);
        setError(err);
        setLoading(false);
      }
    };

    fetchDorms();
  }, [neighborhoodName]);

  const getSlug = (id) => {
    const match = slugMap.find(entry => entry.id === id);
    return match ? match.slug : 'not-found';
  };

  if (loading) return <span style={{ color: colors.white, fontStyle: 'italic' }}>Loading dorms...</span>;
  if (error) return <span style={{ color: colors.errorRed, fontStyle: 'italic' }}>Error loading dorms</span>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}> {/* Removed outer flex, moved to .dorm-list */}
      {dorms.map((dorm, index) => (
        <React.Fragment key={dorm.dorm_id}>
          <Link to={`/${getSlug(dorm.dorm_id)}`} className="dorm-link" style={{ color: colors.lightGray }}>
            <span style={{ textDecorationColor: neighborhoodColor }}>{dorm.name}</span>
          </Link>
          {index < dorms.length - 1 && <span style={{ color: colors.lightGray }}>•</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default NeighborhoodRow;