// NeighborhoodPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DormList from './DormList'; // Import DormList
import NeighborhoodImage from './NeighborhoodImage'; // Adjust the path
import Header from './Header';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import { API_BASE_URL } from '../config';

//const API_BASE_URL = 'http://3.142.242.243:8000';

function NeighborhoodPage() {
  const { neighborhoodId } = useParams();
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/neighborhoods/${neighborhoodId}/dorms`);
        if (!response.ok) {
          throw new Error('Failed to fetch dorms');
        }
        const data = await response.json();
        setDorms(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDorms();
  }, [neighborhoodId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <AuthProvider>
    <div style={{ textAlign: 'center', color: 'white' }}>
      <Header headerText={`The ${neighborhoodId} Neighborhood`} />
      <hr
        style={{
          width: '200px',
          margin: '10px auto',
          borderColor: '#888', // Darker gray
          borderStyle: 'solid',
        }}
      />
      <div style={{ marginBottom: '20px' }}> 
        <DormList dorms={dorms} />
      </div>
      <NeighborhoodImage neighborhood={neighborhoodId} />


    </div>
    </AuthProvider>
  );
}

export default NeighborhoodPage;