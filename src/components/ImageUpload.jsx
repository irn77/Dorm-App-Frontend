import React, { useState, useEffect } from 'react'; // Import useEffect
import './ImageUpload.css';
import { API_BASE_URL } from '../config';

function ImageUpload({ dormId, onImageUploaded, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    if (e.target.checked) {
      setSelectedThemes((prevThemes) => [...prevThemes, theme]); // Corrected: Functional update
    } else {
      setSelectedThemes((prevThemes) => prevThemes.filter((t) => t !== theme)); // Corrected: Functional update
    }
  };

  useEffect(() => {
    console.log('selectedThemes changed:', selectedThemes); // Debugging
  }, [selectedThemes]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setErrorMessage('Please select an image');
      return;
    }
    
    if (selectedThemes.length === 0) {
      setErrorMessage('Please select at least one theme');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', selectedImage);
    selectedThemes.forEach((theme) => formData.append('tags', theme));

    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]); // Debugging
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/dorms/${dormId}/images`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      console.log(data);
      onImageUploaded(data.image_data);
      setSelectedImage(null);
      setSelectedThemes([]);
      setErrorMessage('');
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Failed to upload image');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      {errorMessage && (
        <p className="error" style={{ color: 'black' }}>
          {errorMessage}
        </p>
      )}
      <div className="form-group" style={{ color: 'black' }}>
        <label htmlFor="image-upload" style={{ color: 'black' }}>
          Choose Image:
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ color: 'black' }}
        />
      </div>

      <div className="form-group" style={{ color: 'black' }}>
        <label style={{ color: 'black' }}>Select Theme(s):</label>
        <div className="theme-options">
          <label style={{ color: 'black' }}>
            <input type="checkbox" value="exterior" onChange={handleThemeChange} />
            Exterior
          </label>
          <label style={{ color: 'black' }}>
            <input type="checkbox" value="common-space" onChange={handleThemeChange} />
            Common Space
          </label>
          <label style={{ color: 'black' }}>
            <input type="checkbox" value="dorm-room" onChange={handleThemeChange} />
            Dorm Room
          </label>
          <label style={{ color: 'black' }}>
            <input type="checkbox" value="other" onChange={handleThemeChange} />
            Other
          </label>
        </div>
      </div>

      <button type="submit" className="upload-button" style={{ color: 'black' }}>
        Upload Image
      </button>
    </form>
  );
}

export default ImageUpload;