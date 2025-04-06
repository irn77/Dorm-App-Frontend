import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#1a1a1a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '5rem', marginBottom: '0.5em' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '1em' }}>
        Oops! We couldn’t find that page.
      </p>
     
      <Link
        to="/"
        style={{
          color: '#fff',
          textDecoration: 'none',
          backgroundColor: '#e63946',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: 'background-color 0.2s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#d62839')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#e63946')}
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
