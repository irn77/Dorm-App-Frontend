import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import slugMap from '../data/dormSlugMap.json';
import dormShortcuts from '../data/dormShortcuts.json';
import './Ranked.css';

const neighborhoods = ['Aspen', 'Olive', 'Sequoia', 'Ginkgo', 'Redwood', 'Wisteria', 'Magnolia', 'Rowan'];

function Ranked() {
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDorms = async () => {
      try {
        const allDorms = [];
        for (const neighborhood of neighborhoods) {
          const response = await fetch(`${API_BASE_URL}/api/neighborhood/${neighborhood}/dorms_with_avg`);
          if (!response.ok) throw new Error(`Failed to fetch dorms for ${neighborhood}`);
          const data = await response.json();
          allDorms.push(...data);
        }
        const sorted = allDorms
          .filter(d => d.average_rating && d.average_rating > 0)
          .sort((a, b) => b.average_rating - a.average_rating);
        setDorms(sorted);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchAllDorms();
  }, []);

  const getSlug = (id) => {
    const match = slugMap.find(entry => entry.id === id);
    return match ? match.slug : 'not-found';
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {Array.from({ length: full }, (_, i) => (
          <span key={`full-${i}`} className="star">★</span>
        ))}
        {half && <span className="star">☆</span>}
        {Array.from({ length: empty }, (_, i) => (
          <span key={`empty-${i}`} className="star empty">★</span>
        ))}
      </>
    );
  };

  if (loading) return <p className="ranked-container">Loading dorm rankings...</p>;
  if (error) return <p className="ranked-container">Error: {error.message}</p>;

  return (
    <div className="ranked-container">
      <h2 className="ranked-title">🏆 Dorm Rankings</h2>
      {dorms.map((dorm, index) => {
        const displayName = dormShortcuts[dorm.name] || dorm.name;

        return (
          <div key={dorm.dorm_id} className="ranked-card">
            <div className="ranked-header">
              <span className="ranked-rank">#{index + 1}</span>
              <Link to={`/${getSlug(dorm.dorm_id)}`} className="ranked-name">
                {displayName}
              </Link>
              <div className="ranked-stars">
                {renderStars(dorm.average_rating)}
              </div>
            </div>
            {dorm.review_count && (
              <div className="review-count">
                based on {dorm.review_count} review{dorm.review_count > 1 ? 's' : ''}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Ranked;
