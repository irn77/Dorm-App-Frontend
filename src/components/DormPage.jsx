import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewComponent from './ReviewComponent';
import ImageComponent from './ImageComponent';
import { AuthProvider } from './AuthContext';
import { API_BASE_URL } from '../config';
import NotFoundPage from './NotFoundPage';
import Navbar from './Navbar';
import DormLeftPanel from './DormLeftPanel';
import slugMap from '../data/dormSlugMap.json'; // 👈 new import

import './DormPage.css';

function DormPage() {
  const { slug } = useParams(); // 👈 use slug from URL
  const dormEntry = slugMap.find(entry => entry.slug === slug);
  const dormId = dormEntry ? dormEntry.id : null;

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
    if (!dormId) {
      setError(true);
      setLoading(false);
      return;
    }

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
      <div className="dorm-page">
        <Navbar />

        <div className="dorm-content-container">
          {/* Left Panel */}
          <div className="dorm-left-panel">
            <DormLeftPanel dorm={dorm} />
          </div>

          {/* Right Content */}
          <div className="dorm-right-panel">
            <div className="dorm-toggle">
              <span
                onClick={() => setActiveTab(activeTab === 'reviews' ? 'images' : 'reviews')}
              >
                {activeTab === 'reviews' ? 'View images' : 'View reviews'}
              </span>
            </div>

            {activeTab === 'images' ? (
              <div style={{ marginTop: '20px' }}>
                <ImageComponent
                  dormId={dormId}
                  images={dorm.image_urls || []}
                  onImageUploaded={handleImageUploaded}
                />
              </div>
            ) : (
              <div style={{ marginTop: '20px' }}>
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
