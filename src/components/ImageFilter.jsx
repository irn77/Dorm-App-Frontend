// ImageFilter.jsx
import React from 'react';
import './ImageFilter.css';
import colors from '../styles/colors';

function ImageFilter({ selectedFilters, onFilterChange }) {
  const filters = [
    { label: 'Exterior', value: 'exterior' },
    { label: 'Common Space', value: 'common-space' },
    { label: 'Dorm Room', value: 'dorm-room' },
    { label: 'Other', value: 'other' },
  ];

  const isAllSelected = selectedFilters.length === 0;

  return (
    <div className="filter-options">
      {/* ALL button */}
      <button
        type="button"
        className={`filter-button all-button ${isAllSelected ? 'selected' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>

      {/* Divider */}
      <span className="filter-divider">|</span>

      {/* Other filter buttons */}
      {filters.map(({ label, value }) => {
  const isSelected = selectedFilters.includes(value);
  return (
    <button
      key={value}
      type="button"
      className={`filter-button ${value} ${isSelected ? 'selected' : ''}`}
      onClick={() => onFilterChange(value)}
    >
      {label}
    </button>
  );
})}
    </div>
  );
}

export default ImageFilter;
