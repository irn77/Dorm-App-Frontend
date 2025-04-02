// DormInfo.jsx
import React from 'react';

function DormInfo({ dorm }) {
  return (
    <div>
      <p>Capacity: {dorm.capacity}</p>
      <p>Neighborhood: {dorm.neighborhood}</p>
      {/* Add other dorm info here */}
    </div>
  );
}

export default DormInfo;