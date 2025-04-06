import React, { useState } from 'react';
import ReviewComponent from './ReviewComponent';
import ImageComponent from './ImageComponent';

function DormTabs({ dormId, images, onImageUploaded }) {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ color: 'white', fontSize: '28px', margin: 0 }}>
          {activeTab === 'reviews' ? 'Student Reviews' : 'Dorm Images'}
        </h2>
        <div>
          {activeTab === 'reviews' ? (
            <span
              onClick={() => setActiveTab('images')}
              style={{
                color: '#f4a261',
                cursor: 'pointer',
                marginLeft: '1rem',
                fontWeight: 'bold',
              }}
            >
              See images →
            </span>
          ) : (
            <span
              onClick={() => setActiveTab('reviews')}
              style={{
                color: '#f4a261',
                cursor: 'pointer',
                marginLeft: '1rem',
                fontWeight: 'bold',
              }}
            >
              ← See reviews
            </span>
          )}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'reviews' ? (
        <ReviewComponent dormId={dormId} />
      ) : (
        <ImageComponent dormId={dormId} images={images} onImageUploaded={onImageUploaded} />
      )}
    </div>
  );
}

export default DormTabs;
