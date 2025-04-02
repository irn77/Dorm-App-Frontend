import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function MapSystem() {
  const [currentMap, setCurrentMap] = useState('map1.png');

  const handleSwapClick = () => {
    setCurrentMap(currentMap === 'map1.png' ? 'map2.png' : 'map1.png');
  };

  const mapContainerStyle = {
    position: 'relative',
    maxWidth: '50%',
    margin: '0 auto',
  };

  const mapStyle = {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  };

  const swapButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    maxWidth: '30px',
    height: 'auto',
  };

  return (
    <div style={mapContainerStyle}>
      <Zoom>
        <img src={currentMap} alt="Map" style={mapStyle} />
      </Zoom>
      <img
        src="alter.png"
        alt="Swap Maps"
        style={swapButtonStyle}
        onClick={handleSwapClick}
      />
    </div>
  );
}

export default MapSystem;