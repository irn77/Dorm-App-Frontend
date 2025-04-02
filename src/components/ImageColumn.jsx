// ImageColumn.jsx
import React from 'react';
import Image from './Image'; // Import the Image component

function ImageColumn({ images }) {
  if (!images || images.length === 0) {
    return <p>No images. Add the first!</p>;
  }

  return (
    <div className="image-column">
      {images.map((image, index) => (
        <Image key={index} image={image} />
      ))}
    </div>
  );
}

export default ImageColumn;