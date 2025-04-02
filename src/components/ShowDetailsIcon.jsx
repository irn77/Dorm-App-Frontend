import React from 'react';

function ShowDetailsIcon({ showDetails, setShowDetails }) {
  return (
    <button
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        marginLeft: '5px',
        padding: '0',
      }}
      onClick={() => setShowDetails(!showDetails)}
    >
      <img 
        src="/info_icon.png" 
        alt="Info" 
        style={{ 
          width: '40px', 
          height: '40px', 
          filter: 'invert(1)', // Makes dark icons appear white
        }} 
      />
    </button>
  );
}

export default ShowDetailsIcon;
