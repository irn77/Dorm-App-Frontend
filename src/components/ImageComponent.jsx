import React, { useState, useContext, useEffect } from 'react';
import ImageColumn from './ImageColumn';
import ImageUpload from './ImageUpload';
import { AuthContext } from './AuthContext';
import ImageFilter from './ImageFilter';
import './ImageComponent.css';

function ImageComponent({ dormId, images, onImageUploaded }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [showUpload, setShowUpload] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredImages, setFilteredImages] = useState(images);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New state for success modal

  const handleAddImageClick = () => {
    if (isLoggedIn) {
      setShowUpload(true);
    } else {
      setErrorMessage('You must be signed in to submit a photo.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleCloseModal = () => {
    setShowUpload(false);
    setErrorMessage('');
  };

  const handleImageUploadSuccess = () => {
    setShowSuccessModal(true);
    setShowUpload(false); // Close upload modal
    setTimeout(() => setShowSuccessModal(false), 7000); // Close success modal after 5 seconds
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    if (e.target.checked) {
      setSelectedFilters((prevFilters) => [...prevFilters, filterValue]);
    } else {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== filterValue)
      );
    }
  };

  useEffect(() => {
    const newFilteredImages =
      selectedFilters.length > 0
        ? images.filter((image) => {
            return image && image.tags && image.tags.some((tag) =>
              selectedFilters.includes(tag)
            );
          })
        : images;
    setFilteredImages(newFilteredImages);
  }, [images, selectedFilters]);

  return (
    <div className="image-component-container">
      <h2><span style={{ color: 'white' }}>Dorm Images</span></h2>

      <div className="image-header-controls">
        <ImageFilter
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <button className="add-image-button" onClick={handleAddImageClick}>
          +
        </button>
      </div>

      <ImageColumn images={filteredImages || []} />

      {showUpload && (
        <div className="image-upload-modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={handleCloseModal}
              style={{ color: 'black' }}
            >
              &times;
            </span>
            <h3 style={{ color: 'black' }}>Upload Image</h3>
            <ImageUpload
              dormId={dormId}
              onImageUploaded={() => {
                onImageUploaded();
                handleImageUploadSuccess();
              }}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <p>Success: Thanks for adding an Image! Please allow 24 hours for the image to show.</p>
          </div>
        </div>
      )}

      {errorMessage && <div className="error-bar">{errorMessage}</div>}
    </div>
  );
}

export default ImageComponent;