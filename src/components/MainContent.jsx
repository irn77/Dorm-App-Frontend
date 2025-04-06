// MainContent.jsx
import React from 'react';
import Header from './Header'; // your existing header
import SearchBar from './SearchBar'; // optional if already made

function MainContent() {
  return (
    <div style={{
      flex: 1,
      padding: '2rem',
      color: 'white',
      overflowY: 'auto',
    }}>
      <Header headerText="Welcome to Stanford Dorms!" />
      <p style={{ fontSize: '1rem', color: '#bbb', marginTop: '10px' }}>
        Explore dorms, view ratings, and find your perfect community.
      </p>

      {/* Add your SearchBar here */}
      {/* <SearchBar /> */}

      {/* Map or content */}
      <div style={{
        marginTop: '2rem',
        backgroundColor: '#1e1e1e',
        padding: '1rem',
        borderRadius: '12px',
        minHeight: '300px',
      }}>
        <p style={{ color: '#888' }}>[Map or interactive content goes here]</p>
      </div>
    </div>
  );
}

export default MainContent;
