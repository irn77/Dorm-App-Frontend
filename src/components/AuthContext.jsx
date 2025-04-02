// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []); // Run only once on component mount

  const setAuth = (loggedIn, id) => {
    setIsLoggedIn(loggedIn);
    setUserId(id);
    if (loggedIn) {
      localStorage.setItem('userId', id);
    } else {
      localStorage.removeItem('userId'); // Remove on logout
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};