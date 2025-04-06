import React, { useState } from 'react';
import NeighborhoodColumn from './NeighborhoodColumn';

function NeighborhoodDirectory() {
  const neighborhoods = ['Aspen', 'Olive', 'Sequoia', 'Ginkgo', 'Redwood', 'Wisteria', 'Magnolia', 'Rowan'];
  const [showAllRatings, setShowAllRatings] = useState(false);

  const neighborhoodColors = {
    Aspen: '#DD8833',
    Ginkgo: '#F8CC45',
    Magnolia: '#4D154B',
    Olive: '#6BAFA8',
    Redwood: '#5291B4',
    Rowan: '#CD5340',
    Sequoia: '#7C2020',
    Wisteria: '#7B8535',
  };

  return (
    <div style={{ paddingLeft: '2rem' }}>
      {/* Ratings toggle */}
      <div style={{ marginBottom: '1rem' }}>
        {/* <button
          onClick={() => setShowAllRatings(!showAllRatings)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <img
            src="/icon-directory.png"
            alt="Toggle Ratings"
            style={{
              height: '20px',
              filter: showAllRatings
                ? 'invert(66%) sepia(93%) saturate(1211%) hue-rotate(35deg) brightness(101%) contrast(101%)'
                : 'invert(100%)',
            }}
          />
        </button> */}
      </div>

      {/* Neighborhoods */}
      <div className="neighborhood-container">
        {neighborhoods.map((name) => (
          <div key={name} style={{ marginRight: '2rem', marginBottom: '2rem' }}>
            <h2
              style={{
                color: 'white',
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
                borderBottom: `4px solid ${neighborhoodColors[name]}`,
                display: 'inline-block',
                paddingBottom: '0.2rem',
              }}
            >
              {name}
            </h2>
            <NeighborhoodColumn neighborhoodName={name} showAllRatings={showAllRatings} />
          </div>
        ))}
      </div>

      <style>
        {`
          .neighborhood-container {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: flex-start;
          }

          @media (max-width: 800px) {
            .neighborhood-container {
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}
      </style>
    </div>
  );
}

export default NeighborhoodDirectory;
