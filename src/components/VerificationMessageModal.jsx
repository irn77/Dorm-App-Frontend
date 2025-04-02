import React from 'react';
import './Modal7.css'; // Ensure the CSS is in a separate file for styling

function VerificationMessageModal({ isOpen, onClose }) {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal7-overlay" onClick={onClose}>
      <div className="modal7-content" onClick={(e) => e.stopPropagation()}>
        <span className="close7" onClick={onClose}>&times;</span>
        <h2>Thank you for creating an account. A verification email has been sent. Please click the link within the email to confirm your account.</h2>
      </div>
    </div>
  );
}

export default VerificationMessageModal;
