// DormPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewComponent from './ReviewComponent';
import DormGenPanel from './DormGenPanel'; // New component
import Header from './Header';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import ImageComponent from './ImageComponent'; // Import ImageComponent
import { API_BASE_URL } from '../config';


function DormPage() {
  const { dormId } = useParams();
  const [dorm, setDorm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleImageUploaded = (newImageData) => {
    // Update the dorm state with the new image data (URL and tags)
    setDorm((prevDorm) => ({
      ...prevDorm,
      image_urls: [...(prevDorm.image_urls || []), newImageData],
    }));
  };

  useEffect(() => {
    const fetchDorm = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/dorms/${dormId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dorm details');
        }
        const data = await response.json();
        setDorm(data); // Assuming your API now returns all the dorm data
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDorm();
  }, [dormId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error ? error.message : null}</p>;

  if (!dorm) return null;

  return (
    <AuthProvider> {/* Wrap the content with AuthProvider */}
    <div style={{ textAlign: 'center', color: 'white' }}>
      <Header headerText={dorm.name} />
      <hr
        style={{
          width: '200px',
          margin: '10px auto',
          borderColor: '#888', // Darker gray
          borderStyle: 'solid',
        }}
      />
      <DormGenPanel dorm={dorm} />
      <hr
        style={{
          width: '100%',
          margin: '20px 0',
          borderColor: '#888', // Darker gray
          borderStyle: 'solid',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ flex: 1 }}>
        <ImageComponent
              dormId={dormId}
              images={dorm.image_urls || []}
              onImageUploaded={handleImageUploaded} // Pass the callback
            />
        </div>
        <div style={{ flex: 1 }}>
          <ReviewComponent dormId={dormId} />
        </div>
      </div>
    </div>
    </AuthProvider>
  );
}

export default DormPage;