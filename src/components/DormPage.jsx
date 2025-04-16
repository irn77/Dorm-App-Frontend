import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewComponent from './ReviewComponent';
import ImageComponent from './ImageComponent';
import { AuthProvider } from './AuthContext';
import { API_BASE_URL } from '../config';
import NotFoundPage from './NotFoundPage';
import Navbar from './Navbar';
import DormLeftPanel from './DormLeftPanel';
import slugMap from '../data/dormSlugMap.json';

import './DormPage.css';

function DormPage() {
  const { slug: rawSlug } = useParams();
const slug = rawSlug.toLowerCase();
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
          {/* Left panel */}
          <div className="dorm-left-panel">
            <DormLeftPanel dorm={dorm} />
          </div>

          {/* Right panel */}
          <div className="dorm-right-panel">
            {/* Toggle buttons */}
            <div className="dorm-toggle">
              <button
                className={`filter-button ${activeTab === 'reviews' ? 'selected reviews' : 'inactive'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
              <button
                className={`filter-button ${activeTab === 'images' ? 'selected images' : 'inactive'}`}
                onClick={() => setActiveTab('images')}
              >
                Images
              </button>
            </div>

            {/* Main content (wrapped) */}
            <div className="dorm-main-content">
              {activeTab === 'images' ? (
                <ImageComponent
                  dormId={dormId}
                  images={dorm.image_urls || []}
                  onImageUploaded={handleImageUploaded}
                />
              ) : (
                <ReviewComponent dormId={dormId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default DormPage;
