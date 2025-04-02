// ReviewSearch.jsx
import React, { useState } from 'react';

function ReviewSearch({ reviews, setFilteredReviews }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = reviews.filter((review) =>
      review.text.toLowerCase().includes(term)
    );
    setFilteredReviews(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search reviews..."
      value={searchTerm}
      onChange={handleSearch}
      style={{
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid white',
        borderRadius: '5px',
        backgroundColor: '#333',
        color: 'white',
      }}
    />
  );
}

export default ReviewSearch;