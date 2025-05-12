import React from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import SearchBarRotate from './SearchBarRotate';
import { Link } from 'react-router-dom';
import './HomePage.css';
import colors from '../styles/colors'; // ✅ import your shared colors

function HomePage() {
  return (
    <AuthProvider>
      <div className="homepage-container" style={{ backgroundColor: colors.darkBg, color: colors.white }}>
        <Navbar />
        <div
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '12px 20px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      >
        Limited Time: Leave a review to enter our $100 giveaway!
        <a
          href="/about"
          style={{
            color: 'white',
            marginLeft: '10px',
            textDecoration: 'underline',
          }}
        >
          Learn more →
        </a>
      </div>

        <div className="hero-section">
          {/* Left Text Area */}
          <div className="hero-left">
            <h1>
              Welcome to <span className="highlight">TreeDorms</span>
            </h1>
            <p style={{ color: colors.lightGray }}>
              A dorm review system you can trust. Built by students, for students.
            </p>
            <div className="hero-links">
              <Link to="/about" className="hero-link">
                Learn more →
              </Link>
              <Link to="/directory" className="hero-link">
                View directory →
              </Link>
            </div>
          </div>

          {/* Right Search Area */}
          <div className="hero-right">
            <div className="search-wrapper">
              <p className="search-label">Search Stanford's 75+ dorms:</p>
              <SearchBarRotate
                customStyles={{
                  maxWidth: '450px',
                  width: '100%',
                  height: '60px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default HomePage;


/*
import React, { useState } from 'react';
import { AuthProvider } from './AuthContext';
import Header from './Header';
import SearchBar from './SearchBar';
import MapSystem from './MapSystem';
import NeighborhoodDirectory from './NeighborhoodDirectory';
import CollapsibleDirectory from './CollapsibleDirectory';
import Navbar from './Navbar';

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <div style={{ backgroundColor: '#1f1f1f', minHeight: '100vh' }}>
      <Navbar /> </div>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          overflow: 'hidden', // prevents outer scroll
        }}
      >
        <div
          style={{
            width: sidebarOpen ? '220px' : '60px',
            backgroundColor: '#181818',
            color: 'white',
            borderRight: '1px solid #333',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ padding: '10px' }}>
            <button
              onClick={toggleSidebar}
              style={{
                background: 'none',
                color: 'white',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                width: '100%',
                textAlign: sidebarOpen ? 'right' : 'center',
              }}
              title={sidebarOpen ? 'Collapse' : 'Expand'}
            >
              ☰
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: sidebarOpen ? '10px 15px' : '0',
            }}
          >
            {sidebarOpen && <CollapsibleDirectory />            }
          </div>
        </div>

    
        <div
          style={{
            flex: 1,
            backgroundColor: '#1f1f1f',
            color: 'white',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
         
          <div style={{ padding: 0 }}>
            <Header headerText="TreeDorms" />
          </div>

          
          <div
            style={{
              flex: 1,
              padding: '40px',
              overflowY: 'auto',
            }}
          >
            <p
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginTop: '20px',
                maxWidth: '600px',
              }}
            >
              Your cardinal review system for Stanford dorms. Built by students,
              for students.{' '}
              <a
                href="/about"
                style={{
                  color: '#f4a261',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Learn more →
              </a>
            </p>

            <div style={{ marginTop: '30px' }}>
              <SearchBar />
            </div>

            <div style={{ marginTop: '40px' }}>
              <MapSystem />
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default HomePage;
*/