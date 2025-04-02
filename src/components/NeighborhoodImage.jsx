import React from 'react';

function NeighborhoodImage({ neighborhood }) {
  const bannerSrc = `/${neighborhood}Banner.png`; // Dynamic banner path
  const neighborhoodImageSrc = `/${neighborhood}.png`; // Dynamic neighborhood image path

  const bannerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'block',
  };

  const neighborhoodImageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '200px',
    maxHeight: '150px',
    width: 'auto',
    height: 'auto',
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <img src={bannerSrc} alt={`${neighborhood} Banner`} style={bannerStyle} />
      <img
        src={neighborhoodImageSrc}
        alt={`Image of ${neighborhood}`}
        style={neighborhoodImageStyle}
      />
    </div>
  );
}

export default NeighborhoodImage;