// HomePage.jsx
import React from 'react';
import NeighborhoodDirectory from './NeighborhoodDirectory';
import MapSystem from './MapSystem';
import { AuthProvider } from './AuthContext';
import Header from './Header'; // Assuming you have a Header component

function HomePage() {

  return (
    <AuthProvider>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <Header headerText='StanDorms' />
        <hr
          style={{
            width: '200px',
            margin: '10px auto',
            borderColor: '#888', // Darker gray
            borderStyle: 'solid',
          }}
        />
        <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '20px auto', maxWidth: '600px' }}>
        Your ultimate Stanford dorm review system. Built by students, for students,{' '}
        <a href="/about" style={{ color: '#f4a261', textDecoration: 'none', fontWeight: 'bold' }}>
          Learn more →
        </a>
      </p>
        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
          <MapSystem />
        </div>
        <NeighborhoodDirectory />
      </div>
    </AuthProvider>
  );
}

export default HomePage;
