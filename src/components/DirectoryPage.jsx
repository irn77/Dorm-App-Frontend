import React, { useRef } from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import NeighborhoodDirectory from './NeighborhoodDirectory';
import Ranked from './Ranked'; // ⬅️ Make sure you have this!

function DirectoryPage() {
  const rankedRef = useRef(null);

  const scrollToRanked = () => {
    if (rankedRef.current) {
      rankedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <div style={{ backgroundColor: '#1f1f1f', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <div style={{ padding: '2rem', flex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              onClick={scrollToRanked}
              style={{
                padding: '12px 24px',
                backgroundColor: '#444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#666')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#444')}
            >
              Click To See Dorm Rankings
            </button>
          </div>

          {/* 🏘️ Neighborhood Cards */}
          <NeighborhoodDirectory />

          {/* 📊 Ranked section */}
          <div ref={rankedRef} style={{ marginTop: '4rem' }}>
            <Ranked />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default DirectoryPage;
