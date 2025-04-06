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

  const handleAddImageClick = () => setShowUpload(true);
  const handleCloseModal = () => {
    setShowUpload(false);
    setErrorMessage('');
  };
  const handleImageUploadSuccess = () => {
    setShowSuccessModal(true);
    setShowUpload(false);
    setTimeout(() => setShowSuccessModal(false), 7000);
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

  const splitIntoColumns = (imageList) => {
    const cols = [[], [], []];
    imageList.forEach((img, idx) => {
      cols[idx % 3].push(img);
    });
    return cols;
  };

  useEffect(() => {
    const newFilteredImages =
      selectedFilters.length > 0
        ? images.filter((image) =>
            image?.tags?.some((tag) => selectedFilters.includes(tag))
          )
        : images;
    setFilteredImages(newFilteredImages);
    setImageCols(splitIntoColumns(newFilteredImages));
  }, [images, selectedFilters]);

  return (
    <div className="image-component-container">
      {/* Heading + Button */}
      <div className="image-top-header">
        <h2 style={{ margin: 0, color: 'white' }}>Dorm Images</h2>
        <button className="add-image-button" onClick={handleAddImageClick}>+</button>
      </div>

      {/* Filters below heading */}
      <div className="image-filter-section">
        <ImageFilter
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Image Columns */}
      {filteredImages.length === 0 ? (
  <p style={{ color: 'white', marginTop: '20px' }}>No images. Add the first!</p>
) : (
  <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
    {imageCols.map((col, i) => (
      <div key={i} style={{ flex: 1 }}>
        <ImageColumn images={col} />
      </div>
    ))}
  </div>
)}

      {showUpload && (
        <div className="image-upload-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal} style={{ color: 'black' }}>
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
