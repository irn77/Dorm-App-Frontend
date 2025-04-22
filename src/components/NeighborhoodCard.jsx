// NeighborhoodCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import colors from '../styles/colors';
import slugMap from '../data/dormSlugMap.json';

function NeighborhoodCard({ neighborhoodName, neighborhoodColor }) {
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDorms = async () => {
      const apiUrl = `${API_BASE_URL}/api/neighborhood/${neighborhoodName}/dorms_with_avg`;
      console.log(`[NeighborhoodCard] Fetching dorms for ${neighborhoodName} from: ${apiUrl}`);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          console.error(`[NeighborhoodCard] API error fetching ${neighborhoodName}:`, response.status);
          throw new Error(`Failed to fetch dorms for ${neighborhoodName}`);
        }
        const data = await response.json();
        console.log(`[NeighborhoodCard] Dorms received for ${neighborhoodName}:`, data);
        setDorms(data);
        setLoading(false);
      } catch (err) {
        console.error(`[NeighborhoodCard] Error fetching ${neighborhoodName}:`, err);
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

  if (loading) return <div className="neighborhood-card loading">Loading...</div>;
  if (error) return <div className="neighborhood-card error">Error: {error.message}</div>;

  return (
    <div className="neighborhood-card">
      <h3 style={{ margin: '0 0 0.5rem 0', paddingBottom: '0.5rem', borderBottom: `2px solid ${neighborhoodColor}` }}>
        {neighborhoodName} Neighborhood
      </h3>
      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
        {dorms.map((dorm) => (
          <li key={dorm.dorm_id} style={{ marginBottom: '0.25rem' }}>
            <Link to={`/${getSlug(dorm.dorm_id)}`} style={{ color: colors.lightGray, textDecoration: 'none' }}>
              {dorm.name}
            </Link>
          </li>
        ))}
      </ul>

      <style>
  {`
    .neighborhood-card {
      border: 1px solid ${colors.lightGray}; /* Gray outline */
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      display: flex;
      flex-direction: column;
      padding: 1.25rem;
      transition: transform 0.2s ease-in-out;
      flex: 1 1 360px;
      max-width: 100%;
    }



    .neighborhood-card.loading {
      color: ${colors.white};
      font-style: italic;
    }

    .neighborhood-card.error {
      background-color: #ffe0e0;
      border-color: ${colors.errorRed};
      color: ${colors.errorRed};
    }

    .neighborhood-card h3 {
      color: ${colors.white};
      font-size: 1.5rem; /* ⬅️ Bigger heading */
      margin-top: 0;
    }

    .neighborhood-card ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .neighborhood-card li {
      margin-bottom: 0.5rem;
      font-size: 1.1rem; /* ⬅️ Bigger dorm name text */
    }

    .neighborhood-card a {
      color: ${colors.lightGray};
      text-decoration: none;
    }

    .neighborhood-card a:hover {
      text-decoration: underline;
    }
  `}
</style>

    </div>
  );
}

export default NeighborhoodCard;