import React from 'react';
import './AuthModal6.css'; // Updated CSS class names

function AuthModal6({
  isOpen,
  onClose,
  onSubmit,
  username,
  password,
  setUsername,
  setPassword,
  errorMessage,
  verificationMessage,
  isSignUp,
  setIsSignUp
}) {
  if (!isOpen) return null;

  return (
    <div className="modal6-overlay" onClick={onClose}>
      <div className="modal6-content" onClick={(e) => e.stopPropagation()}>
        <span
          className="close6"
          onClick={onClose}
          style={{ color: 'black', cursor: 'pointer', fontSize: '24px' }}
        >
          &times;
        </span>

        <h2 style={{ fontSize: '6em' }}>👤</h2> {/* Replace text with icon */}
        <form onSubmit={onSubmit}>
          <div className="form-group6">
            <label>Stanford Email:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your stanford email"
              className="input-field6"
            />
          </div>
          <div className="form-group6">
            <label>{isSignUp ? 'Create Password:' : 'Password:'}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignUp ? 'Create your password' : 'Enter your password'}
              className="input-field6"
            />
          </div>
          {errorMessage && <div className="error-message6">{errorMessage}</div>}
          {verificationMessage && (
            <div className="verification-message6">{verificationMessage}</div>
          )}
          <button type="submit" className="auth-button6">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div>
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setIsSignUp(false)}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span
                onClick={() => setIsSignUp(true)}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal6;
