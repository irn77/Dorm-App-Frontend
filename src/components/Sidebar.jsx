// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const neighborhoods = ['Aspen', 'Olive', 'Sequoia', 'Ginkgo', 'Redwood', 'Wisteria', 'Magnolia', 'Rowan'];

function Sidebar() {
  return (
    <div style={{
      width: '250px',
      backgroundColor: '#1e1e1e',
      padding: '1rem',
      color: 'white',
      overflowY: 'auto',
      borderRight: '1px solid #333',
    }}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Neighborhoods</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {neighborhoods.map((n) => (
          <li key={n} style={{ margin: '8px 0' }}>
            <Link to={`/neighborhood/${n}`} style={{ color: '#f4a261', textDecoration: 'none' }}>
              {n}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
