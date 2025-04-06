// CollapsibleDirectory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const neighborhoods = ['Aspen', 'Olive', 'Sequoia', 'Ginkgo', 'Redwood', 'Wisteria', 'Magnolia', 'Rowan'];

function CollapsibleDirectory() {
  const [expanded, setExpanded] = useState({});
  const [dormsByNeighborhood, setDormsByNeighborhood] = useState({});

  useEffect(() => {
    neighborhoods.forEach((neigh) => {
      fetch(`${API_BASE_URL}/api/neighborhood/${neigh}/dorms_with_avg`)
        .then((res) => res.json())
        .then((data) =>
          setDormsByNeighborhood((prev) => ({
            ...prev,
            [neigh]: data,
          }))
        );
    });
  }, []);

  const toggleNeighborhood = (neigh) => {
    setExpanded((prev) => ({
      ...prev,
      [neigh]: !prev[neigh],
    }));
  };

  const getAverageColor = (avg) => {
    if (!avg) return 'gray';
    const hue = ((avg - 1) / 4) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const displayAverage = (avg) => (avg ? `(${avg.toFixed(1)})` : 'No reviews');

  return (
    <div style={{ color: 'white' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
        Directory
        <img src="/icon-directory.png" alt="star" style={{ height: '20px', marginLeft: '8px' }} />
      </h2>

      {neighborhoods.map((neigh) => (
        <div key={neigh} style={{ marginBottom: '10px' }}>
          <div
            onClick={() => toggleNeighborhood(neigh)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 10px',
              backgroundColor: '#2a2a2a',
              borderRadius: '6px',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{neigh}</span>
            <span style={{ transform: expanded[neigh] ? 'rotate(90deg)' : 'rotate(0)', transition: '0.3s' }}>
              ▶
            </span>
          </div>

          {expanded[neigh] && dormsByNeighborhood[neigh] && (
            <ul style={{ listStyle: 'none', paddingLeft: '15px', marginTop: '5px' }}>
              {dormsByNeighborhood[neigh].map((dorm) => (
                <li key={dorm.dorm_id} style={{ margin: '5px 0' }}>
                  <Link
                    to={`/dorm/${dorm.dorm_id}`}
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    {dorm.name}
                  </Link>
                  <span style={{ color: getAverageColor(dorm.average_rating), marginLeft: '5px' }}>
                    {displayAverage(dorm.average_rating)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default CollapsibleDirectory;
