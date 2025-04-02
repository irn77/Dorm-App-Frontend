// LoggedInModal.jsx
import React from 'react';
//import './LoggedInModal.css'; // Import your CSS

function LoggedInModal({ isOpen, onClose, onLogout }) {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="emoji">😇</div>
        <h2>You are logged in!</h2>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default LoggedInModal;

const styles = `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  text-align: center;
  animation: animatezoom 0.3s ease-in-out;
  max-width: 400px;
  width: 90%;
}

.close {
  position: absolute;
  right: 15px;
  top: 10px;
  color: black !important;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: red;
}

.emoji {
  font-size: 60px;
  margin-bottom: 10px;
}

h2 {
  color: black;
}

.logout-button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

.logout-button:hover {
  opacity: 0.8;
}

@keyframes animatezoom {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
`;

// Append styles to document head
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
