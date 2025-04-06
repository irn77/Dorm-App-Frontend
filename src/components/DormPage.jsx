import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewComponent from './ReviewComponent';
import ImageComponent from './ImageComponent';
import { AuthProvider } from './AuthContext';
import { API_BASE_URL } from '../config';
import NotFoundPage from './NotFoundPage';
import Navbar from './Navbar';
import DormLeftPanel from './DormLeftPanel';

function DormPage() {
  const { dormId } = useParams();
  const [dorm, setDorm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('reviews');

  const handleImageUploaded = (newImageData) => {
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
        if (!response.ok) throw new Error("Dorm not found");
        const data = await response.json();
        setDorm(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDorm();
  }, [dormId]);

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;
  if (error) return <NotFoundPage />;
  if (!dorm) return null;

  return (
    <AuthProvider>
      <div
        style={{
          backgroundColor: '#1A1A1A',
          color: 'white',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left Panel */}
          <div style={{ display: 'flex', position: 'relative' }}>
            <div
              style={{
                width: '350px',
                minWidth: '300px',
                maxWidth: '400px',
                overflowY: 'auto',
                paddingLeft: '65px',
                paddingTop: '6px',
                paddingRight: '20px',
              }}
            >
              <DormLeftPanel dorm={dorm} />
            </div>
            <div style={{ width: '1px', backgroundColor: '#444', height: '100%' }} />
          </div>

          {/* Right Content */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              paddingTop: '20px',
              paddingLeft: '40px',
              paddingRight: '40px',
              paddingBottom: '20px',
              position: 'relative',
            }}
          >
            {/* Toggle switch */}
            <div style={{ position: 'absolute', top: '20px', right: '40px', zIndex: 10 }}>
              <span
                onClick={() => setActiveTab(activeTab === 'reviews' ? 'images' : 'reviews')}
                style={{
                  color: '#f4a261',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  backgroundColor: '#1a1a1a',
                  padding: '4px 8px',
                  borderRadius: '6px',
                }}
              >
                {activeTab === 'reviews' ? 'View images' : 'View reviews'}
              </span>
            </div>

            {/* Review / Image Component */}
            {activeTab === 'images' ? (
              <div style={{ marginLeft: '20px' }}>
                <ImageComponent
                  dormId={dormId}
                  images={dorm.image_urls || []}
                  onImageUploaded={handleImageUploaded}
                />
              </div>
            ) : (
              <div style={{ marginRight: '20px' }}>
                <ReviewComponent dormId={dormId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default DormPage;
