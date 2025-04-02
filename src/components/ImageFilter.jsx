// ImageFilter.jsx
import React from 'react';
import './ImageFilter.css'; // Create ImageFilter.css for styling

function ImageFilter({ selectedFilters, onFilterChange }) {
  return (
    <div className="filter-options">
      <label>
        <input
          type="checkbox"
          value="exterior"
          checked={selectedFilters.includes("exterior")}
          onChange={onFilterChange}
        />
        Exterior
      </label>
      <label>
        <input
          type="checkbox"
          value="common-space"
          checked={selectedFilters.includes("common-space")}
          onChange={onFilterChange}
        />
        Common Space
      </label>
      <label>
        <input
          type="checkbox"
          value="dorm-room"
          checked={selectedFilters.includes("dorm-room")}
          onChange={onFilterChange}
        />
        Dorm Room
      </label>
      <label>
        <input
          type="checkbox"
          value="other"
          checked={selectedFilters.includes("other")}
          onChange={onFilterChange}
        />
        Other
      </label>
    </div>
  );
}

export default ImageFilter;