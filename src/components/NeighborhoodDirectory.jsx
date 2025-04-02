import React, { useState } from 'react';
import NeighborhoodColumn from './NeighborhoodColumn';

function NeighborhoodDirectory() {
  const neighborhoods = ['Aspen', 'Olive', 'Sequoia', 'Ginkgo', 'Redwood', 'Wisteria', 'Magnolia', 'Rowan'];
  const [showAllRatings, setShowAllRatings] = useState(false);

  return (
    <div>
      <div
        className="neighborhood-container"
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '0px',
        }}
      ></div>
      <h1 style={{ textAlign: 'left', color: 'white', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
        Directory
        <button
          onClick={() => setShowAllRatings(!showAllRatings)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
        >
          <img
            src="/icon-directory.png" // Path to your icon in the public folder
            alt="Toggle Ratings"
            style={{ height: '20px' , filter: showAllRatings ? 'invert(66%) sepia(93%) saturate(1211%) hue-rotate(35deg) brightness(101%) contrast(101%)' : 'invert(100%)'}} // Adjust size as needed
          />
        </button>
      </h1>
      <div className="neighborhood-container">
        {neighborhoods.map((neighborhoodName) => (
          <NeighborhoodColumn
            key={neighborhoodName}
            neighborhoodName={neighborhoodName}
            showAllRatings={showAllRatings}
          />
        ))}
      </div>
      <style>
        {`
          .neighborhood-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
          }

          @media (max-width: 800px) {
            .neighborhood-container {
              flex-direction: column;
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  );
}

export default NeighborhoodDirectory;