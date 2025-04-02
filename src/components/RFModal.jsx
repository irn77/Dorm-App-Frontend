// RFModal.jsx
import React from 'react';
import './RFModal.css';

function RFModal({ isOpen, onClose, rfAbout, dormName }) {
  if (!isOpen) return null;

  console.log('RFModal - rfAbout:', rfAbout); // Add this line

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        <div className="modalContent">
        <h2 style={{ color: 'white' }}>{dormName} Resident Fellows</h2>
        <p style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>{rfAbout.replace(/\\n/g, '\n')}</p>
        </div>
        <button onClick={onClose} className="closeButton">
          Close
        </button>
      </div>
    </>
  );
}

export default RFModal;