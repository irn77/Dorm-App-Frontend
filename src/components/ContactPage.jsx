import React from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import { Mail } from 'lucide-react'; // uses lucide for clean icons
import './ContactPage.css'; // optional custom styles

function ContactPage() {
  return (
    <AuthProvider>
      <div style={{ backgroundColor: '#1f1f1f', color: '#fff', minHeight: '100vh' }}>
        <Navbar />

        <div className="contact-container">
          <h1 className="contact-title">Have Questions? Feedback? Comments?</h1>
          <p className="contact-subtitle">We would love to connect!</p>

          <div className="email-card">
        <Mail size={28} className="email-icon" />
        <a href="mailto:cardinaldorms@gmail.com" className="email-link">
              cardinaldorms@gmail.com
            </a>
        </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default ContactPage;
