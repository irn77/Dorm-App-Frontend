// Image.jsx
import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'; // Import the zoom styles
import './Image.css';
import { API_BASE_URL } from '../config';

function Image({ image }) {
  if (!image || !image.url) {
    return <p>Image not available</p>;
  }

  const imageUrl = `${API_BASE_URL}${image.url}`; // Hardcoded URL for development

  return (
    <div className="image-container">
      <div className="image-wrapper">
      <Zoom>
        <img src={imageUrl} alt="Dorm Image" className="zoomable-image" />
      </Zoom>
      {image.tags && image.tags.length > 0 && (
        <div className="image-tags">
          {image.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div></div>
  );
}

export default Image;