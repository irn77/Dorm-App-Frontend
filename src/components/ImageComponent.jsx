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
  const [imageCols, setImageCols] = useState([[], [], []]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [columnCount, setColumnCount] = useState(getColumnCount());

  // Utility: Determine column count based on window width
  function getColumnCount() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1224) return 2;
    return 3;
  }

  // Resize handler to keep column count in sync with screen size
  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modal controls
  const handleAddImageClick = () => {
    // if (!isLoggedIn) {
    //   setErrorMessage('You must be logged in to add images.');
    //   setTimeout(() => setErrorMessage(''), 3000);
    // } else {
      setShowUpload(true);
    // }
  };
  const handleCloseModal = () => {
    setShowUpload(false);
    setErrorMessage('');
  };
  const handleImageUploadSuccess = () => {
    setShowSuccessModal(true);
    setShowUpload(false);
    setTimeout(() => setShowSuccessModal(false), 7000);
    if (onImageUploaded) {
      onImageUploaded(); // Notify parent component
    }
  };

  // Filter checkbox logic
  const handleFilterChange = (value) => {
    if (value === 'all') {
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prevFilters) =>
        prevFilters.includes(value)
          ? prevFilters.filter((f) => f !== value)
          : [...prevFilters, value]
      );
    }
  };

  // Helper: Evenly split images into `colCount` columns
  const splitIntoColumns = (imageList, colCount = 3) => {
    const cols = Array.from({ length: colCount }, () => []);
    imageList.forEach((img, idx) => {
      cols[idx % colCount].push(img);
    });
    return cols;
  };

  // Main effect: filter + split images into columns
  useEffect(() => {
    const newFilteredImages =
      selectedFilters.length > 0
        ? images.filter((image) =>
            image?.tags?.some((tag) => selectedFilters.includes(tag))
          )
        : images;

    setFilteredImages(newFilteredImages);
    setImageCols(splitIntoColumns(newFilteredImages, columnCount));
  }, [images, selectedFilters, columnCount]);

  return (
    <div className="image-component-container">
      {/* Header */}
      <div className="image-top-header">
        <h2 style={{ margin: 0, color: 'white' }}>Dorm Images</h2>
        <button className="add-image-button" onClick={handleAddImageClick}>
          <span className="plus-icon">+</span> Add Image
        </button>
      </div>

      {/* Filters */}
      <div className="image-filter-section">
        <ImageFilter
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Image Grid */}
      {filteredImages.length === 0 ? (
        <p style={{ color: 'white', marginTop: '20px' }}>No images. Add the first!</p>
      ) : (
        <div className="image-grid">
          {imageCols.map((colImages, index) => (
            <ImageColumn key={index} images={colImages} />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="image-upload-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal} style={{ color: 'black' }}>
              &times;
            </span>
            <h3 style={{ color: 'black' }}>Upload Image</h3>
            <ImageUpload
              dormId={dormId}
              onImageUploaded={handleImageUploadSuccess}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <p>Success: Thanks for adding an Image! Please allow 24 hours for the image to show.</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <div className="error-bar">{errorMessage}</div>}
    </div>
  );
}

export default ImageComponent;