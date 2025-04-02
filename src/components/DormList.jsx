import React from 'react';
import { Link } from 'react-router-dom';

function DormList({ dorms }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {dorms.map((dorm, index) => (
        <React.Fragment key={dorm.dorm_id}>
          <Link
            to={`/dorm/${dorm.dorm_id}`}
            style={{
              color: 'white',
              textDecoration: 'none',
              marginRight: '10px',
              marginLeft: '10px', // Add left margin
            }}
          >
            {dorm.name}
          </Link>
          {index < dorms.length - 1 && (
            <span
              style={{
                color: 'white',
                marginRight: '10px', // Add right margin
                marginLeft: '10px', // Add left margin
              }}
            >
              •
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default DormList;