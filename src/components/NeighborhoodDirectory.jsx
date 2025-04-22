// NeighborhoodDirectory.jsx
import React from 'react';
import NeighborhoodCard from './NeighborhoodCard';

function NeighborhoodDirectory() {
  const neighborhoods = ['Aspen', 'Olive', 'Sequoia', 'Ginkgo', 'Redwood', 'Wisteria', 'Magnolia', 'Rowan'];
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
    <div style={{ padding: '2rem' }}>
      <div className="neighborhood-grid-container">
        {neighborhoods.map((name) => (
          <NeighborhoodCard
            key={name}
            neighborhoodName={name}
            neighborhoodColor={neighborhoodColors[name]}
          />
        ))}
      </div>

      <style>
      <style>
  {`
    .neighborhood-grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); /* Wider cards */
      gap: 1.5rem;
    }
  `}
</style>
      </style>
    </div>
  );
}

export default NeighborhoodDirectory;