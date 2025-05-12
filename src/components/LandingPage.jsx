import React from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import SearchBarRotate from './SearchBarRotate';
import NeighborhoodDirectory from './NeighborhoodDirectory';
import './HomePage.css'; // For homepage styles
import './AboutPage.css'; // Optional: if you have a separate AboutPage.css

function FAQItem({ question, answer }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={{
        marginBottom: '1rem',
        borderBottom: '1px solid #333',
        paddingBottom: '0.75rem',
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          color: '#f4a261',
          fontWeight: 'bold',
          fontSize: '1.4rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {question}
        <span style={{ fontWeight: 'normal', color: '#888' }}>{open ? '–' : '+'}</span>
      </div>
      {open && (
        <p style={{ marginTop: '0.5rem', fontSize: '1.15rem', lineHeight: '1.7' }}>{answer}</p>
      )}
    </div>
  );
}

function LandingPage() {
  return (
    <AuthProvider>
      <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh' }}>
        <Navbar />

        {/* HOMEPAGE CONTENT */}
        
        <div id="home" className="hero-section" style={{ padding: '4rem 2rem' }}>
          <div className="hero-left">
            <h1>Welcome to <span className="highlight">TreeDorms</span></h1>
            <p>A dorm review system you can trust. Built by students, for students.</p>
            <div className="hero-links">
              <Link to="/about" className="hero-link">Learn more →</Link>
              <Link to="/directory" className="hero-link">View directory →</Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="search-wrapper">
              <p className="search-label">Search Stanford's 73 dorms:</p>
              <SearchBarRotate customStyles={{ width: '100%', maxWidth: '450px', height: '60px' }} />
            </div>
          </div>
        </div>

        {/* DIRECTORY CONTENT */}
        <div id="directory" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#f4a261' }}>Explore the Directory</h2>
          <NeighborhoodDirectory />
        </div>

        {/* ABOUT CONTENT */}
        <div id="about"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '3rem 2rem',
            textAlign: 'left',
          }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#f4a261' }}>
            Learn About TreeDorms
          </h1>

          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.8' }}>
            <strong>What:</strong> TreeDorms is a transparent hub for Stanford dorm reviews...
          </p>

          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.8' }}>
            <strong>Why:</strong> Choosing dorms is difficult (for all of us)...
          </p>

          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.8' }}>
            <strong>How:</strong> Students leave anonymous feedback and upload images...
          </p>

          <p
            style={{
              fontStyle: 'italic',
              fontSize: '1.2rem',
              margin: '2rem 0',
              lineHeight: '1.7',
            }}
          >
            "We hope TreeDorms empowers you to discover the best fit..."
          </p>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#FF4500' }}>FAQ</h2>

          <FAQItem
            question="Is this really anonymous?"
            answer="100%. We never store any identifiable data..."
          />
          <FAQItem
            question="How are reviews moderated?"
            answer="All submissions go through a light check..."
          />
          <FAQItem
            question="Have a question not listed here?"
            answer={
              <>
                Contact us <a href="/contact" style={{ color: '#f4a261', textDecoration: 'underline' }}>here</a>.
              </>
            }
          />
        </div>
      </div>
    </AuthProvider>
  );
}

export default LandingPage;
