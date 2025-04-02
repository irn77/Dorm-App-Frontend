// User.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import VerificationMessageModal from './VerificationMessageModal';
import LoggedInModal from './LoggedInModal';
import AuthModal from './AuthModal'; // Import the new component
import "./LoggedInModal.css";
import "./User.css";
import { API_BASE_URL } from '../config';

function User() {
  const { setAuth, isLoggedIn } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showLoggedInModal, setShowLoggedInModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setAuth(true, data.user_id);
        localStorage.setItem('userId', data.user_id);
        setShowModal(false);
        setUsername('');
        setPassword('');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationMessage('Verification email sent. Please check your inbox.');
        setShowVerificationModal(true);
        setShowModal(false);
        setUsername('');
        setPassword('');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('An error occurred during signup.');
    }
  };

  const handleLogout = () => {
    setAuth(false, null);
    localStorage.removeItem('userId');
    setShowLoggedInModal(false);
  };

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowLoggedInModal(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div>
      <div
        className="user-icon"
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '40px',
        }}
        onClick={handleUserIconClick}
      >
        {isLoggedIn ? '😇' : '👤'}
      </div>

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={isSignUp ? handleSignUp : handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        errorMessage={errorMessage}
        verificationMessage={verificationMessage}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />

      <LoggedInModal
        isOpen={showLoggedInModal}
        onClose={() => setShowLoggedInModal(false)}
        onLogout={handleLogout}
      />
      
      <VerificationMessageModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />
    </div>
  );
}

export default User;
