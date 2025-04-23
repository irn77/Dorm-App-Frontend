import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import colors from '../styles/colors';
import slugMap from '../data/dormSlugMap.json';
import './NeighborhoodCard.css'; // Import the CSS file

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

  if (loading) return <div className="neighborhoodCard neighborhoodCardLoading">Loading...</div>;
  if (error) return <div className="neighborhoodCard neighborhoodCardError">Error: {error.message}</div>;

  return (
    <div className="neighborhoodCard">
      <h3 style={{ margin: '0 0 0.5rem 0', paddingBottom: '0.5rem', borderBottomColor: neighborhoodColor }}>
        {neighborhoodName} Neighborhood
      </h3>
      <ul className="neighborhoodCardUl">
        {dorms.map((dorm) => (
          <li key={dorm.dorm_id} className="neighborhoodCardLi">
            <Link to={`/${getSlug(dorm.dorm_id)}`} className="neighborhoodCardA">
              {dorm.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NeighborhoodCard;