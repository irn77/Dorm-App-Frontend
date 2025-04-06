import React from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import NeighborhoodDirectory from './NeighborhoodDirectory';

function DirectoryPage() {
  return (
    <AuthProvider>
      <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        
        <div style={{ padding: '2rem', flex: 1 }}>
       
          <NeighborhoodDirectory />
        </div>
      </div>
    </AuthProvider>
  );
}

export default DirectoryPage;
