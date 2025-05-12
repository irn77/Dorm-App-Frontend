// Footer.jsx
import React from 'react';
import './Footer.css';
import colors from '../styles/colors';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: colors.deepBg,
        color: colors.white,
        padding: '30px 40px',
        fontSize: '15px',
        textAlign: 'center',
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '20px',
          gap: '10px',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>TreeDorms</div>
        <div style={{ color: colors.mediumGray }}>© 2025 TreeDorms</div>
      </div>

      <div style={{ color: colors.lightGray }}>
        <p>
          Have an idea to improve the site? Let us know at{' '}
          <a
            href="mailto:TreeDorms@gmail.com"
            style={{
              color: colors.orange,
              textDecoration: 'none',
              fontWeight: 500,
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            TreeDorms@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
